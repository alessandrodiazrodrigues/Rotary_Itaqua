import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config/settings';
import Button from '../components/common/Button';
import authService from '../services/auth';

/**
 * Página de Login
 * Suporta login via Google OAuth e WhatsApp/SMS
 */
const Login = () => {
  const [loginType, setLoginType] = useState('google'); // google ou whatsapp
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [step, setStep] = useState('choice'); // choice, sms-sent, code-input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Verificar se já está logado
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getUser();
      if (authService.isAdmin()) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/companheiro';
      }
    }
  }, []);

  // Carregar Google SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Handle Login Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await authService.loginWithGoogle();
      setSuccess('Login realizado com sucesso!');
      
      // Redirect será feito automaticamente pelo authService
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle WhatsApp Login - Enviar SMS
  const handleWhatsAppLogin = async () => {
    if (!phone || phone.length < 10) {
      setError('Digite um número de celular válido');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await authService.loginWithWhatsApp(phone);
      setSuccess('Código enviado por SMS!');
      setStep('code-input');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle validação do código SMS
  const handleSMSValidation = async () => {
    if (!smsCode || smsCode.length !== 6) {
      setError('Digite o código de 6 dígitos');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await authService.validateSMSCode(smsCode);
      setSuccess('Login realizado com sucesso!');
      
      // Redirect será feito automaticamente
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Formatar telefone enquanto digita
  const formatPhoneInput = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return value;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
  };

  // Voltar para escolha de login
  const handleBack = () => {
    setStep('choice');
    setPhone('');
    setSmsCode('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Header com Logo */}
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-sm leading-tight"
            style={{ backgroundColor: CONFIG.COLORS.primary }}
          >
            ROTARY<br/>ITAQUÁ<br/>4563
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {CONFIG.CLUB_NAME}
          </h1>
          <p className="text-gray-600">Sistema de Gestão de Convites</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          
          {/* Mensagens */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Escolha de Login */}
          {step === 'choice' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">Acesso ao Sistema</h2>
              
              {/* Login Google */}
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center"
                onClick={handleGoogleLogin}
                loading={loading && loginType === 'google'}
                icon="🔵"
              >
                Entrar com Google
              </Button>
              
              <div className="text-center text-gray-500 text-sm">
                ─── ou ───
              </div>
              
              {/* Login WhatsApp */}
              <div className="space-y-3">
                <input
                  type="tel"
                  placeholder="(11) 99999-1234"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={15}
                />
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center"
                  onClick={handleWhatsAppLogin}
                  loading={loading && loginType === 'whatsapp'}
                  icon="📲"
                >
                  Enviar Código SMS
                </Button>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">Manter-me conectado</span>
                </label>
              </div>
            </div>
          )}

          {/* Input do Código SMS */}
          {step === 'code-input' && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Código Enviado</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Digite o código de 6 dígitos enviado para<br/>
                  <strong>{phone}</strong>
                </p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="000000"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={6}
                />
                
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  onClick={handleSMSValidation}
                  loading={loading}
                  disabled={smsCode.length !== 6}
                >
                  Confirmar Código
                </Button>
                
                <Button
                  variant="ghost"
                  size="md"
                  className="w-full justify-center"
                  onClick={handleBack}
                >
                  ← Voltar
                </Button>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                Não recebeu? <button 
                  className="text-blue-600 hover:underline" 
                  onClick={handleWhatsAppLogin}
                >
                  Enviar novamente
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Para companheiros do<br/>
          {CONFIG.CLUB_NAME}
        </div>
      </div>
    </div>
  );
};

export default Login;
