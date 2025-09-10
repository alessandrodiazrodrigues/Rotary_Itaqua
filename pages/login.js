// pages/login.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { CONFIG } from '../src/config/settings'

export default function Login() {
  const router = useRouter()
  const [loginType, setLoginType] = useState('choice') // choice, whatsapp, sms-code
  const [phone, setPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Verificar se já está logado
  useEffect(() => {
    const user = localStorage.getItem('rotary_user')
    if (user) {
      router.push('/dashboard')
    }
  }, [router])

  // Handle Login Google
  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Simular login Google
      setTimeout(() => {
        const userData = {
          id: 'USER001',
          nome: 'Alessandro Rodrigues',
          email: CONFIG.ADMIN_EMAIL,
          nivel_acesso: 'admin',
          login_type: 'google'
        }
        
        localStorage.setItem('rotary_user', JSON.stringify(userData))
        setSuccess('Login realizado com sucesso!')
        
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
        
        setLoading(false)
      }, 2000)
      
    } catch (error) {
      setError('Erro no login Google')
      setLoading(false)
    }
  }

  // Handle WhatsApp Login - Enviar SMS
  const handleWhatsAppLogin = async () => {
    if (!phone || phone.length < 10) {
      setError('Digite um número de celular válido')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Simular envio de SMS
      setTimeout(() => {
        setSuccess('Código enviado por SMS! Use 123456 para teste.')
        setLoginType('sms-code')
        setLoading(false)
      }, 2000)
      
    } catch (error) {
      setError('Erro ao enviar SMS')
      setLoading(false)
    }
  }

  // Handle validação do código SMS
  const handleSMSValidation = async () => {
    if (!smsCode || smsCode.length !== 6) {
      setError('Digite o código de 6 dígitos')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      setTimeout(() => {
        if (smsCode === '123456') {
          const userData = {
            id: 'USER002',
            nome: 'João Silva',
            telefone: phone,
            nivel_acesso: 'companheiro',
            login_type: 'whatsapp'
          }
          
          localStorage.setItem('rotary_user', JSON.stringify(userData))
          setSuccess('Login realizado com sucesso!')
          
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        } else {
          setError('Código incorreto. Use 123456 para teste.')
        }
        setLoading(false)
      }, 1500)
      
    } catch (error) {
      setError('Erro na validação')
      setLoading(false)
    }
  }

  // Formatar telefone
  const formatPhoneInput = (value) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
    
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    
    return value
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneInput(e.target.value)
    setPhone(formatted)
  }

  const handleBack = () => {
    setLoginType('choice')
    setPhone('')
    setSmsCode('')
    setError('')
    setSuccess('')
  }

  // Componente Alert simplificado
  const Alert = ({ type, message, onClose, className = '' }) => {
    const styles = {
      error: 'bg-red-50 border border-red-200 text-red-700',
      success: 'bg-green-50 border border-green-200 text-green-700',
      warning: 'bg-yellow-50 border border-yellow-200 text-yellow-700',
      info: 'bg-blue-50 border border-blue-200 text-blue-700'
    }

    return (
      <div className={`rounded-lg p-4 ${styles[type]} ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className={`fas fa-${type === 'error' ? 'exclamation-triangle' : type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} mr-2`}></i>
            <span className="text-sm font-medium">{message}</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 text-current hover:opacity-70"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    )
  }

  // Componente Button simplificado
  const Button = ({ variant = 'primary', children, onClick, loading, disabled, icon, className = '', ...props }) => {
    const variants = {
      primary: 'bg-blue-900 hover:bg-blue-800 text-white',
      secondary: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      outline: 'border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white',
      ghost: 'text-gray-600 hover:text-blue-900 hover:bg-blue-50'
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ) : (
          icon && <i className={icon}></i>
        )}
        {children}
      </button>
    )
  }

  return (
    <>
      <Head>
        <title>Login - {CONFIG.CLUB_NAME}</title>
        <meta name="description" content="Acesso ao Sistema de Gestão de Convites" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          
          {/* Header com Logo */}
          <div className="text-center mb-8">
            <div 
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-sm leading-tight"
              style={{ backgroundColor: CONFIG.COLORS.primary }}
            >
              ROTARY<br/>ITAQUÁ<br/>{CONFIG.DISTRICT}
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
              <Alert
                type="error"
                message={error}
                onClose={() => setError('')}
                className="mb-4"
              />
            )}
            
            {success && (
              <Alert
                type="success"
                message={success}
                className="mb-4"
              />
            )}

            {/* Escolha de Login */}
            {loginType === 'choice' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center mb-6">Acesso ao Sistema</h2>
                
                {/* Informação para usuários */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-blue-900 mb-2">Como acessar:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li><strong>👨‍💼 Alessandro (Admin):</strong> Login com Google</li>
                    <li><strong>🤝 Companheiros:</strong> WhatsApp ou Google</li>
                    <li><strong>📱 Código teste SMS:</strong> 123456</li>
                  </ul>
                </div>
                
                {/* Login Google */}
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  loading={loading}
                  icon="fab fa-google"
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
                    onClick={handleWhatsAppLogin}
                    loading={loading}
                    icon="fas fa-mobile-alt"
                  >
                    Enviar Código SMS
                  </Button>
                </div>
                
                <div className="mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 focus:ring-blue-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-600">Manter-me conectado</span>
                  </label>
                </div>
              </div>
            )}

            {/* Input do Código SMS */}
            {loginType === 'sms-code' && (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Código Enviado</h2>
                  <p className="text-gray-600 text-sm mb-6">
                    Digite o código de 6 dígitos enviado para<br/>
                    <strong>{phone}</strong>
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-xs text-yellow-800">
                      <strong>💡 Para teste:</strong> Use o código <strong>123456</strong>
                    </p>
                  </div>
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
                    onClick={handleSMSValidation}
                    loading={loading}
                    disabled={smsCode.length !== 6}
                    icon="fas fa-check"
                  >
                    Confirmar Código
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    icon="fas fa-arrow-left"
                  >
                    Voltar
                  </Button>
                </div>
                
                <div className="text-center text-sm text-gray-500">
                  Não recebeu? 
                  <button 
                    className="ml-1 text-blue-600 hover:underline" 
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
            <p>Sistema exclusivo para</p>
            <p className="font-medium">{CONFIG.CLUB_NAME}</p>
            <p className="text-xs mt-2">Distrito {CONFIG.DISTRICT} • São Paulo</p>
          </div>
          
          {/* Debug Info */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
            <p><strong>🧪 Dados para Teste:</strong></p>
            <p>• <strong>Admin Google:</strong> Qualquer conta Google</p>
            <p>• <strong>Companheiro SMS:</strong> Código 123456</p>
            <p>• <strong>Telefone:</strong> Qualquer número válido</p>
          </div>
        </div>
      </div>
    </>
  )
}
