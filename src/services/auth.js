import { CONFIG } from '../config/settings';
import Cookies from 'js-cookie';

/**
 * Serviço de Autenticação
 * Gerencia login via Google OAuth e WhatsApp/SMS
 */
class AuthService {
  constructor() {
    this.TOKEN_KEY = 'rotary_token';
    this.USER_KEY = 'rotary_user';
    this.SESSION_TIMEOUT = CONFIG.SESSION_TIMEOUT;
  }

  /**
   * Verifica se o usuário está logado
   */
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    
    if (!token || !user) {
      return false;
    }
    
    // Verifica se o token não expirou
    const tokenData = this.parseToken(token);
    if (!tokenData || tokenData.exp < Date.now()) {
      this.logout();
      return false;
    }
    
    return true;
  }

  /**
   * Verifica se o usuário é admin (Alessandro)
   */
  isAdmin() {
    const user = this.getUser();
    return user && user.email === CONFIG.ADMIN_EMAIL;
  }

  /**
   * Login via Google OAuth
   */
  async loginWithGoogle() {
    try {
      // Inicializar Google Sign-In
      if (!window.google) {
        throw new Error('Google SDK não carregado');
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CONFIG.GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: async (response) => {
          if (response.access_token) {
            await this.handleGoogleCallback(response.access_token);
          }
        }
      });

      client.requestAccessToken();
    } catch (error) {
      console.error('Erro no login Google:', error);
      throw new Error('Falha no login com Google');
    }
  }

  /**
   * Processa callback do Google OAuth
   */
  async handleGoogleCallback(accessToken) {
    try {
      // Buscar dados do usuário no Google
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }

      const googleUser = await response.json();
      
      // Verificar se é usuário autorizado
      const userData = await this.validateUser({
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        login_type: 'google'
      });

      if (userData) {
        this.setSession(userData);
        return userData;
      } else {
        throw new Error('Usuário não autorizado');
      }
    } catch (error) {
      console.error('Erro no callback Google:', error);
      throw error;
    }
  }

  /**
   * Login via WhatsApp/SMS
   */
  async loginWithWhatsApp(phone) {
    try {
      const formattedPhone = this.formatPhone(phone);
      
      // Gerar código SMS
      const code = this.generateSMSCode();
      
      // Enviar SMS via API
      const response = await fetch('/api/auth/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: formattedPhone,
          code: code
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar SMS');
      }

      // Salvar código temporariamente (5 minutos)
      const tempData = {
        phone: formattedPhone,
        code: code,
        timestamp: Date.now()
      };
      
      sessionStorage.setItem('sms_temp', JSON.stringify(tempData));
      
      return { success: true, message: 'Código enviado por SMS' };
    } catch (error) {
      console.error('Erro no envio SMS:', error);
      throw error;
    }
  }

  /**
   * Validar código SMS
   */
  async validateSMSCode(inputCode) {
    try {
      const tempData = JSON.parse(sessionStorage.getItem('sms_temp') || '{}');
      
      if (!tempData.code || !tempData.timestamp) {
        throw new Error('Código não encontrado ou expirado');
      }

      // Verificar se não expirou (5 minutos)
      if (Date.now() - tempData.timestamp > CONFIG.SMS_CODE_EXPIRY) {
        sessionStorage.removeItem('sms_temp');
        throw new Error('Código expirado. Solicite um novo.');
      }

      // Verificar código
      if (inputCode !== tempData.code) {
        throw new Error('Código incorreto');
      }

      // Validar usuário no sistema
      const userData = await this.validateUser({
        phone: tempData.phone,
        login_type: 'whatsapp'
      });

      if (userData) {
        sessionStorage.removeItem('sms_temp');
        this.setSession(userData);
        return userData;
      } else {
        throw new Error('Usuário não autorizado');
      }
    } catch (error) {
      console.error('Erro na validação SMS:', error);
      throw error;
    }
  }

  /**
   * Validar usuário no Google Sheets
   */
  async validateUser(userData) {
    try {
      const response = await fetch(`${CONFIG.GOOGLE_SHEETS_API}?action=validate_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Erro na validação do usuário');
      }

      const result = await response.json();
      return result.user || null;
    } catch (error) {
      console.error('Erro na validação:', error);
      return null;
    }
  }

  /**
   * Configurar sessão do usuário
   */
  setSession(userData) {
    const token = this.generateToken(userData);
    
    // Salvar nos cookies (secure)
    Cookies.set(this.TOKEN_KEY, token, { 
      expires: 30, // 30 dias
      secure: true,
      sameSite: 'strict'
    });
    
    Cookies.set(this.USER_KEY, JSON.stringify(userData), { 
      expires: 30,
      secure: true,
      sameSite: 'strict'
    });

    // Salvar no localStorage para acesso rápido
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  /**
   * Gerar token JWT simples
   */
  generateToken(userData) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      user_id: userData.id,
      email: userData.email,
      is_admin: userData.email === CONFIG.ADMIN_EMAIL,
      iat: Date.now(),
      exp: Date.now() + this.SESSION_TIMEOUT
    }));
    
    const signature = btoa(`${header}.${payload}.${CONFIG.SECURITY.JWT_SECRET}`);
    
    return `${header}.${payload}.${signature}`;
  }

  /**
   * Decodificar token
   */
  parseToken(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      return JSON.parse(atob(parts[1]));
    } catch (error) {
      return null;
    }
  }

  /**
   * Obter token
   */
  getToken() {
    return Cookies.get(this.TOKEN_KEY) || localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obter dados do usuário
   */
  getUser() {
    try {
      const userData = Cookies.get(this.USER_KEY) || localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Logout
   */
  logout() {
    Cookies.remove(this.TOKEN_KEY);
    Cookies.remove(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.clear();
    
    // Redirect para login
    window.location.href = '/login';
  }

  /**
   * Formatar telefone
   */
  formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone;
  }

  /**
   * Gerar código SMS de 6 dígitos
   */
  generateSMSCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Atualizar última atividade
   */
  updateActivity() {
    if (this.isAuthenticated()) {
      const user = this.getUser();
      user.last_activity = Date.now();
      this.setSession(user);
    }
  }
}

// Singleton
const authService = new AuthService();

export default authService;
