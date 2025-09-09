// pages/convite/[codigo].js - Página do Cliente
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';

const ConvitePage = () => {
  const router = useRouter();
  const { codigo } = router.query;
  const [convite, setConvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    quantidade: 1,
    tipo_convite: 'inteira'
  });
  const [step, setStep] = useState('form'); // form, payment, success
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const ROTARY_COLORS = {
    primary: '#17458f',
    secondary: '#f7a81b'
  };

  // Carregar dados do convite
  useEffect(() => {
    if (codigo) {
      // Simular carregamento de dados do convite
      setTimeout(() => {
        const mockConvite = {
          id: codigo,
          evento: {
            nome: 'Costelada Rotary',
            emoji: '🥩',
            data: '2024-12-15T12:00:00',
            local: 'Roda d\'Água',
            descricao: 'Tradicional almoço do clube com costelada no rolete, acompanhamentos regionais e ambiente familiar.',
            valor_inteira: 100.00,
            valor_meia: 50.00,
            imagem: '/evento-costelada.jpg'
          },
          companheiro: {
            nome: 'João Silva',
            telefone: '(11) 99999-1234'
          },
          disponivel: true
        };
        setConvite(mockConvite);
        setLoading(false);
      }, 1000);
    }
  }, [codigo]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calcularValorTotal = () => {
    if (!convite) return 0;
    const valorUnitario = formData.tipo_convite === 'inteira' 
      ? convite.evento.valor_inteira 
      : convite.evento.valor_meia;
    return valorUnitario * formData.quantidade;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    
    // Simular processamento do pagamento
    setTimeout(() => {
      setStep('success');
      setPaymentLoading(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Carregando Convite - Rotary Club Itaquaquecetuba</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando convite...</p>
          </div>
        </div>
      </>
    );
  }

  if (!convite?.disponivel) {
    return (
      <>
        <Head>
          <title>Convite Indisponível - Rotary Club Itaquaquecetuba</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Convite Indisponível</h1>
            <p className="text-gray-600 mb-4">
              Este convite não está mais disponível ou já foi utilizado.
            </p>
            <Button onClick={() => router.push('/')} variant="outline">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{convite.evento.nome} - Rotary Club Itaquaquecetuba</title>
        <meta name="description" content={convite.evento.descricao} />
        <meta property="og:title" content={`${convite.evento.emoji} ${convite.evento.nome}`} />
        <meta property="og:description" content={convite.evento.descricao} />
        <meta property="og:image" content={convite.evento.imagem || '/rotary-logo.png'} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b-4 border-yellow-500">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs leading-tight"
                style={{ backgroundColor: ROTARY_COLORS.primary }}
              >
                ROTARY<br/>ITAQUÁ
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Rotary Club Itaquaquecetuba</h1>
                <p className="text-sm text-gray-600">Distrito 4563 • Convite Digital</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 py-8">
          {step === 'form' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informações do Evento */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{convite.evento.emoji}</div>
                    <h2 className="text-2xl font-bold mb-2">{convite.evento.nome}</h2>
                    <p className="opacity-90">{convite.evento.descricao}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-calendar text-blue-600"></i>
                    <div>
                      <div className="font-medium">Data e Hora</div>
                      <div className="text-sm text-gray-600">{formatDate(convite.evento.data)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-map-marker-alt text-blue-600"></i>
                    <div>
                      <div className="font-medium">Local</div>
                      <div className="text-sm text-gray-600">{convite.evento.local}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-user text-blue-600"></i>
                    <div>
                      <div className="font-medium">Vendido por</div>
                      <div className="text-sm text-gray-600">
                        {convite.companheiro.nome} • {convite.companheiro.telefone}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-medium text-yellow-800 mb-2">💰 Valores</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Inteira (adultos)</span>
                        <span className="font-medium">{formatCurrency(convite.evento.valor_inteira)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meia (5-12 anos)</span>
                        <span className="font-medium">{formatCurrency(convite.evento.valor_meia)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário de Compra */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Finalizar Compra</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(11) 99999-1234"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Convite
                      </label>
                      <select
                        name="tipo_convite"
                        value={formData.tipo_convite}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="inteira">Inteira - {formatCurrency(convite.evento.valor_inteira)}</option>
                        <option value="meia">Meia (5-12 anos) - {formatCurrency(convite.evento.valor_meia)}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantidade
                      </label>
                      <select
                        name="quantidade"
                        value={formData.quantidade}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} convite{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Total a Pagar:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatCurrency(calcularValorTotal())}
                      </span>
                    </div>
                    <div className="text-sm text-blue-700">
                      {formData.quantidade} × {formData.tipo_convite} × {formatCurrency(formData.tipo_convite === 'inteira' ? convite.evento.valor_inteira : convite.evento.valor_meia)}
                    </div>
                  </div>

                  <Button type="submit" fullWidth size="lg" className="text-lg">
                    Continuar para Pagamento
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </form>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Finalizar Pagamento</h3>
                  <p className="text-gray-600">Escolha a forma de pagamento</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium mb-2">Resumo do Pedido</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{convite.evento.nome}</span>
                      <span>{formatDate(convite.evento.data)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{formData.nome}</span>
                      <span>{formData.telefone}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>{formData.quantidade} × {formData.tipo_convite}</span>
                      <span>{formatCurrency(calcularValorTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === 'pix' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <i className="fas fa-mobile-alt text-2xl text-blue-600"></i>
                        <div className="text-left">
                          <div className="font-medium">PIX</div>
                          <div className="text-sm text-gray-600">Aprovação instantânea</div>
                          <div className="text-xs text-green-600">Taxa: R$ 0,40</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('cartao')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === 'cartao' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <i className="fas fa-credit-card text-2xl text-purple-600"></i>
                        <div className="text-left">
                          <div className="font-medium">Cartão</div>
                          <div className="text-sm text-gray-600">Crédito ou Débito</div>
                          <div className="text-xs text-yellow-600">Taxa: 3,99%</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep('form')}>
                    <i className="fas fa-arrow-left mr-2"></i>
                    Voltar
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={handlePayment} 
                    loading={paymentLoading}
                    size="lg"
                  >
                    {paymentMethod === 'pix' ? 'Gerar QR Code PIX' : 'Pagar com Cartão'}
                    <i className="fas fa-lock ml-2"></i>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pagamento Confirmado!</h3>
                <p className="text-gray-600 mb-6">Seu convite foi gerado com sucesso.</p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-qrcode text-4xl text-gray-600 mb-2"></i>
                      <div className="text-xs text-gray-500">QR CODE</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Convite:</strong> D{Math.floor(Math.random() * 500).toString().padStart(3, '0')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Apresente este QR Code na entrada do evento
                  </p>
                </div>

                <Alert
                  type="success"
                  message="QR Code enviado por WhatsApp e email (se informado)"
                  className="mb-6"
                />

                <div className="flex gap-4">
                  <Button variant="outline" icon="fas fa-download">
                    Baixar QR Code
                  </Button>
                  <Button variant="secondary" icon="fab fa-whatsapp">
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-300">Rotary Club Itaquaquecetuba • Distrito 4563</p>
            <p className="text-sm text-gray-400 mt-1">
              "Servir é a renda que pagamos pelo espaço que ocupamos na Terra"
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ConvitePage;
