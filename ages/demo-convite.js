// pages/demo-convite.js - Página de Demonstração
import { useState } from 'react';
import Head from 'next/head';
import { CONFIG } from '../config/settings';

export default function DemoConvite() {
  const [step, setStep] = useState('convite'); // convite, pagamento, sucesso
  const [formData, setFormData] = useState({
    nome: 'Maria Santos',
    email: 'maria@email.com',
    telefone: '(11) 99999-1234',
    quantidade: 2,
    tipo_convite: 'inteira'
  });
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loading, setLoading] = useState(false);

  const evento = {
    id: 'DEMO001',
    nome: 'Costelada Rotary',
    emoji: '🥩',
    data: '2024-12-15T12:00:00',
    local: 'Roda d\'Água',
    descricao: 'Tradicional almoço do clube com costelada no rolete, acompanhamentos regionais e ambiente familiar.',
    valor_inteira: 100.00,
    valor_meia: 50.00,
    capacidade: 300
  };

  const companheiro = {
    nome: 'João Silva',
    telefone: '(11) 99999-1234'
  };

  const codigoConvite = 'D147';

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
    const valorUnitario = formData.tipo_convite === 'inteira' 
      ? evento.valor_inteira 
      : evento.valor_meia;
    return valorUnitario * formData.quantidade;
  };

  const calcularTaxas = (metodo) => {
    const valorBase = calcularValorTotal();
    if (metodo === 'pix') {
      return { taxa: 0.40, total: valorBase + 0.40 };
    } else {
      const taxa = valorBase * 0.0399; // 3.99%
      return { taxa: taxa, total: valorBase + taxa };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('pagamento');
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setStep('sucesso');
      setLoading(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const gerarMensagemWhatsApp = () => {
    const valorTotal = calcularValorTotal();
    const mensagem = `🎪 CONVITE COSTELADA ROTARY

Olá ${formData.nome}!

Você está convidada para nossa tradicional Costelada Rotary! 🥩

📅 ${formatDate(evento.data)}
📍 ${evento.local}
👥 ${formData.quantidade} convite${formData.quantidade > 1 ? 's' : ''} ${formData.tipo_convite}
💰 Total: ${formatCurrency(valorTotal)}

🔗 Finalize sua compra:
https://rotary-itaqua.vercel.app/convite/${codigoConvite}

Pagamento seguro via PIX ou cartão!
Dúvidas: ${companheiro.telefone} - ${companheiro.nome}`;

    return encodeURIComponent(mensagem);
  };

  const compartilharWhatsApp = () => {
    const mensagem = gerarMensagemWhatsApp();
    window.open(`https://api.whatsapp.com/send?text=${mensagem}`, '_blank');
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(`https://rotary-itaqua.vercel.app/convite/${codigoConvite}`);
    alert('Link copiado para a área de transferência!');
  };

  return (
    <>
      <Head>
        <title>DEMO - {evento.nome} - Rotary Club Itaquaquecetuba</title>
        <meta name="description" content="Demonstração do sistema de convites digitais" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
        {/* Header de Demo */}
        <div className="bg-yellow-400 text-black py-2 px-4 text-center font-medium">
          🧪 DEMONSTRAÇÃO - Sistema de Convites Digitais Rotary
        </div>

        {/* Header */}
        <header className="bg-white shadow-sm border-b-4 border-yellow-500">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs leading-tight"
                style={{ backgroundColor: CONFIG.COLORS.primary }}
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
          {step === 'convite' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informações do Evento */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{evento.emoji}</div>
                    <h2 className="text-2xl font-bold mb-2">{evento.nome}</h2>
                    <p className="opacity-90">{evento.descricao}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-calendar text-blue-600"></i>
                    <div>
                      <div className="font-medium">Data e Hora</div>
                      <div className="text-sm text-gray-600">{formatDate(evento.data)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-map-marker-alt text-blue-600"></i>
                    <div>
                      <div className="font-medium">Local</div>
                      <div className="text-sm text-gray-600">{evento.local}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-user text-blue-600"></i>
                    <div>
                      <div className="font-medium">Vendido por</div>
                      <div className="text-sm text-gray-600">
                        {companheiro.nome} • {companheiro.telefone}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-medium text-yellow-800 mb-2">💰 Valores</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Inteira (adultos)</span>
                        <span className="font-medium">{formatCurrency(evento.valor_inteira)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Meia (5-12 anos)</span>
                        <span className="font-medium">{formatCurrency(evento.valor_meia)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">📱 Como Compartilhar</h3>
                    <div className="space-y-2">
                      <button
                        onClick={compartilharWhatsApp}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                      >
                        <i className="fab fa-whatsapp"></i>
                        Enviar por WhatsApp
                      </button>
                      <button
                        onClick={copiarLink}
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-copy"></i>
                        Copiar Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário de Compra */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-800 text-sm font-medium">
                    ✅ Esta é uma demonstração. Os dados são fictícios.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-6">Finalizar Compra - Convite {codigoConvite}</h3>

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
                        <option value="inteira">Inteira - {formatCurrency(evento.valor_inteira)}</option>
                        <option value="meia">Meia (5-12 anos) - {formatCurrency(evento.valor_meia)}</option>
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
                      {formData.quantidade} × {formData.tipo_convite} × {formatCurrency(formData.tipo_convite === 'inteira' ? evento.valor_inteira : evento.valor_meia)}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 text-lg font-medium"
                  >
                    Continuar para Pagamento
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </form>
              </div>
            </div>
          )}

          {step === 'pagamento' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Finalizar Pagamento</h3>
                  <p className="text-gray-600">Escolha a forma de pagamento</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <p className="text-yellow-800 text-sm font-medium">
                    🧪 DEMO: PIX e valores são fictícios para demonstração
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium mb-2">Resumo do Pedido</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{evento.nome}</span>
                      <span>{formatDate(evento.data)}</span>
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
                          <div className="text-xs text-green-600">
                            Total: {formatCurrency(calcularTaxas('pix').total)}
                          </div>
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
                          <div className="text-xs text-yellow-600">
                            Total: {formatCurrency(calcularTaxas('cartao').total)}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'pix' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <h4 className="font-medium text-blue-900 mb-4">Pagamento PIX</h4>
                      <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <i className="fas fa-qrcode text-6xl text-gray-600 mb-2"></i>
                          <div className="text-xs text-gray-500">QR CODE PIX</div>
                          <div className="text-xs text-gray-500">DEMO</div>
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><strong>Chave PIX:</strong> 12.345.678/0001-90</p>
                        <p><strong>Valor:</strong> {formatCurrency(calcularTaxas('pix').total)}</p>
                        <p><strong>Taxa PIX:</strong> {formatCurrency(0.40)}</p>
                        <p className="text-red-600"><strong>⏰ Expira em:</strong> 14:59</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('convite')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Voltar
                  </button>
                  <button 
                    onClick={handlePayment}
                    disabled={loading}
                    className="flex-1 bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'pix' ? 'Confirmar Pagamento PIX' : 'Pagar com Cartão'}
                        <i className="fas fa-lock ml-2"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'sucesso' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pagamento Confirmado!</h3>
                <p className="text-gray-600 mb-6">Seu convite foi gerado com sucesso.</p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <p className="text-green-800 text-sm font-medium">
                    🧪 DEMO: Na versão real, o QR Code seria enviado por WhatsApp e email
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-qrcode text-4xl text-gray-600 mb-2"></i>
                      <div className="text-xs text-gray-500">QR CODE</div>
                      <div className="text-xs text-gray-500">{codigoConvite}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Convite:</strong> {codigoConvite}
                  </p>
                  <p className="text-sm text-gray-600">
                    Apresente este QR Code na entrada do evento
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    ✅ QR Code enviado por WhatsApp para {formData.telefone}
                  </p>
                  {formData.email && (
                    <p className="text-blue-800 text-sm">
                      ✅ Confirmação enviada por email para {formData.email}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('convite')}
                    className="flex-1 bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800"
                  >
                    Nova Demonstração
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <i className="fas fa-print mr-2"></i>
                    Imprimir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-300">🧪 Demonstração - Sistema de Convites Digitais</p>
            <p className="text-gray-300">Rotary Club Itaquaquecetuba • Distrito 4563</p>
            <p className="text-sm text-gray-400 mt-1">
              "Servir é a renda que pagamos pelo espaço que ocupamos na Terra"
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
