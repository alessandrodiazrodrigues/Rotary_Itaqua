
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Página de Login
 * Suporta login via Google OAuth e WhatsApp/SMS
 */
const Login = () => {
  const router = useRouter();
  const [loginType, setLoginType] = useState('google'); // google ou whatsapp
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [step, setStep] = useState('choice'); // choice, sms-sent, code-input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cores do Rotary
  const ROTARY_COLORS = {
    primary: '#17458f',
    secondary: '#f7a81b',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  };

  // Verificar se já está logado
  useEffect(() => {
    // Simular verificação de autenticação
    const isLoggedIn = localStorage.getItem('rotary_user');
    if (isLoggedIn) {
      router.push('/Dashboard');
    }
  }, [router]);

  // Handle Login Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simular login Google
      setTimeout(() => {
        const userData = {
          id: 'USER001',
          nome: 'Alessandro Rodrigues',
          email: 'cvcalessandro@gmail.com',
          nivel_acesso: 'admin'
        };
        
        localStorage.setItem('rotary_user', JSON.stringify(userData));
        setSuccess('Login realizado com sucesso!');
        
        setTimeout(() => {
          router.push('/Dashboard');
        }, 1000);
      }, 2000);
      
    } catch (error) {
      setError('Erro no login Google');
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
      // Simular envio de SMS
      setTimeout(() => {
        setSuccess('Código enviado por SMS!');
        setStep('code-input');
        setLoading(false);
      }, 2000);
      
    } catch (error) {
      setError('Erro ao enviar SMS');
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
      // Simular validação
      setTimeout(() => {
        if (smsCode === '123456') {
          const userData = {
            id: 'USER002',
            nome: 'Companheiro Rotary',
            telefone: phone,
            nivel_acesso: 'companheiro'
          };
          
          localStorage.setItem('rotary_user', JSON.stringify(userData));
          setSuccess('Login realizado com sucesso!');
          
          setTimeout(() => {
            router.push('/Dashboard');
          }, 1000);
        } else {
          setError('Código incorreto. Use 123456 para teste.');
        }
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      setError('Erro na validação');
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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
      <div className="max-w-md w-full">
        
        {/* Header com Logo */}
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-sm leading-tight"
            style={{ backgroundColor: ROTARY_COLORS.primary }}
          >
            ROTARY<br/>ITAQUÁ<br/>4563
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Rotary Club Itaquaquecetuba
          </h1>
          <p className="text-gray-600">Sistema de Gestão de Convites</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          
          {/* Mensagens */}
          {error && (
            <div className="mb-4 p-3 border border-red-200 rounded-lg text-red-700 text-sm" style={{ backgroundColor: '#f8d7da' }}>
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 border border-green-200 rounded-lg text-green-700 text-sm" style={{ backgroundColor: '#d4edda' }}>
              {success}
            </div>
          )}

          {/* Escolha de Login */}
          {step === 'choice' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-6">Acesso ao Sistema</h2>
              
              {/* Login Google */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 rounded-lg font-medium transition-all hover:shadow-md disabled:opacity-50"
                style={{ 
                  borderColor: ROTARY_COLORS.primary,
                  color: ROTARY_COLORS.primary
                }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="text-2xl">🔵</span>
                )}
                Entrar com Google
              </button>
              
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-blue-500"
                  style={{ focusRingColor: ROTARY_COLORS.primary }}
                  maxLength={15}
                />
                <button
                  onClick={handleWhatsAppLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: ROTARY_COLORS.secondary }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-xl">📲</span>
                  )}
                  Enviar Código SMS
                </button>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 focus:ring-blue-500"
                    style={{ accentColor: ROTARY_COLORS.primary }}
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
                <p className="text-xs text-gray-500 mb-4">
                  Para teste, use o código: <strong>123456</strong>
                </p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="000000"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:border-blue-500"
                  maxLength={6}
                />
                
                <button
                  onClick={handleSMSValidation}
                  disabled={loading || smsCode.length !== 6}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: ROTARY_COLORS.primary }}
                >
                  {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                  Confirmar Código
                </button>
                
                <button
                  onClick={handleBack}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  ← Voltar
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                Não recebeu? <button 
                  className="hover:underline" 
                  style={{ color: ROTARY_COLORS.primary }}
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
          Rotary Club Itaquaquecetuba
        </div>
      </div>
    </div>
  );
};

export default Login;
