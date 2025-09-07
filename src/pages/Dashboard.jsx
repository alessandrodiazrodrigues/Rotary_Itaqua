import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RotaryDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeModal, setActiveModal] = useState(null);

  // Cores oficiais seguindo o CSS original
  const ROTARY_COLORS = {
    primary: '#17458f',
    secondary: '#f7a81b',
    blueMono: '#0067c8',
    interactBlue: '#00a2e0',
    background: '#ffffff',
    surface: '#f8f9fa',
    border: '#dee2e6',
    textPrimary: '#212529',
    textSecondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545'
  };

  const CHART_COLORS = [ROTARY_COLORS.primary, ROTARY_COLORS.secondary, ROTARY_COLORS.success, ROTARY_COLORS.danger, ROTARY_COLORS.warning];

  // Dados simulados
  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      
      setTimeout(() => {
        const mockData = {
          resumo_geral: {
            total_eventos: 2,
            total_convites: 265,
            receita_total: 22530,
            taxa_checkin: 89
          },
          eventos: [
            {
              id: 'EVT001',
              nome: 'Costelada Rotary',
              emoji: '🥩',
              data: '2024-12-15T12:00:00',
              local: 'Roda d\'Água',
              capacidade: 300,
              valor_inteira: 100.00,
              valor_meia: 50.00,
              status: 'ativo',
              vendidos: 187,
              disponivel: 113,
              arrecadado: 17350,
              ocupacao: 62
            },
            {
              id: 'EVT002',
              nome: 'Porco no Rolete',
              emoji: '🐷',
              data: '2024-12-22T11:30:00',
              local: 'Roda d\'Água',
              capacidade: 300,
              valor_inteira: 70.00,
              valor_meia: 35.00,
              status: 'planejamento',
              vendidos: 78,
              disponivel: 222,
              arrecadado: 5180,
              ocupacao: 26
            }
          ]
        };
        
        setDashboard(mockData);
        setLoading(false);
      }, 1000);
    };

    loadDashboard();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const showModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-5 h-5 border-3 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: ROTARY_COLORS.background }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-50 shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${ROTARY_COLORS.primary} 0%, ${ROTARY_COLORS.blueMono} 100%)`,
          borderBottom: `4px solid ${ROTARY_COLORS.primary}`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-15 h-15 rounded-full flex items-center justify-center text-xs font-bold text-center leading-tight"
                style={{ 
                  backgroundColor: ROTARY_COLORS.background,
                  color: ROTARY_COLORS.primary,
                  width: '60px',
                  height: '60px'
                }}
              >
                ROTARY<br/>ITAQUÁ<br/>4563
              </div>
              <div className="text-white">
                <h1 className="text-xl sm:text-2xl font-semibold">Rotary Club Itaquaquecetuba</h1>
                <p className="text-sm opacity-90">Distrito 4563 • Sistema de Gestão de Convites</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <span className="hidden sm:block">Alessandro Rodrigues</span>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: ROTARY_COLORS.secondary }}
              >
                AR
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ backgroundColor: ROTARY_COLORS.surface, borderBottom: `2px solid ${ROTARY_COLORS.border}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            {[
              { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
              { id: 'events', icon: 'fas fa-calendar-alt', label: 'Eventos' },
              { id: 'invites', icon: 'fas fa-ticket-alt', label: 'Convites' },
              { id: 'sales', icon: 'fas fa-chart-line', label: 'Vendas' },
              { id: 'members', icon: 'fas fa-users', label: 'Companheiros' },
              { id: 'how-it-works', icon: 'fas fa-info-circle', label: 'Como Funciona' },
              { id: 'reports', icon: 'fas fa-file-alt', label: 'Relatórios' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center gap-2 border-b-3 transition-all duration-300 ${
                  activeTab === tab.id
                    ? `border-b-3 text-blue-900`
                    : 'border-transparent text-gray-600 hover:text-blue-900 hover:bg-blue-50'
                }`}
                style={{
                  borderBottomColor: activeTab === tab.id ? ROTARY_COLORS.secondary : 'transparent',
                  backgroundColor: activeTab === tab.id ? 'rgba(23, 69, 143, 0.05)' : 'transparent'
                }}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { value: dashboard.resumo_geral.total_eventos, label: 'Eventos Ativos', icon: 'fas fa-calendar-check' },
                { value: dashboard.resumo_geral.total_convites, label: 'Convites Vendidos', icon: 'fas fa-ticket-alt' },
                { value: formatCurrency(dashboard.resumo_geral.receita_total), label: 'Faturamento Total', icon: 'fas fa-coins' },
                { value: `${dashboard.resumo_geral.taxa_checkin}%`, label: 'Taxa Check-in', icon: 'fas fa-chart-pie' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="relative p-6 rounded-xl text-white text-center overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${ROTARY_COLORS.primary} 0%, ${ROTARY_COLORS.blueMono} 100%)`,
                    boxShadow: '0 2px 8px rgba(23, 69, 143, 0.1)'
                  }}
                >
                  <div 
                    className="absolute top-0 right-0 w-25 h-25 rounded-full opacity-10"
                    style={{ 
                      width: '100px', 
                      height: '100px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translate(30px, -30px)'
                    }}
                  ></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                    <i className={`${stat.icon} absolute bottom-4 right-4 text-2xl opacity-30`}></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Eventos Ativos */}
            <div className="bg-white rounded-xl shadow p-6 mb-8" style={{ border: `1px solid ${ROTARY_COLORS.border}` }}>
              <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: `2px solid ${ROTARY_COLORS.surface}` }}>
                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: ROTARY_COLORS.primary }}>
                  <i className="fas fa-calendar-alt"></i>
                  Eventos Ativos
                </h2>
                <button 
                  onClick={() => showModal('createEvent')}
                  className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:opacity-90 transition-all"
                  style={{ backgroundColor: ROTARY_COLORS.primary }}
                >
                  <i className="fas fa-plus"></i>
                  Novo Evento
                </button>
              </div>

              <div className="space-y-4">
                {dashboard.eventos.map((evento) => (
                  <div 
                    key={evento.id}
                    className="rounded-lg p-6 border hover:shadow-lg transition-all cursor-pointer"
                    style={{ 
                      borderLeft: `4px solid ${ROTARY_COLORS.secondary}`,
                      backgroundColor: ROTARY_COLORS.background,
                      boxShadow: '0 2px 8px rgba(23, 69, 143, 0.1)'
                    }}
                    onClick={() => setSelectedEvent(evento)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: ROTARY_COLORS.primary }}>
                          {evento.emoji} {evento.nome}
                        </h3>
                        <div className="flex items-center gap-4 text-sm" style={{ color: ROTARY_COLORS.textSecondary }}>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-calendar"></i>
                            {formatDate(evento.data)}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-map-marker-alt"></i>
                            {evento.local}
                          </span>
                        </div>
                        <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: ROTARY_COLORS.surface }}>
                          <strong>💰 Valores:</strong> Inteira {formatCurrency(evento.valor_inteira)} • Meia (5-12 anos) {formatCurrency(evento.valor_meia)}
                        </div>
                      </div>
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          evento.status === 'ativo' 
                            ? 'text-green-800'
                            : 'text-yellow-800'
                        }`}
                        style={{ 
                          backgroundColor: evento.status === 'ativo' ? '#e8f5e8' : '#fff3cd'
                        }}
                      >
                        {evento.status === 'ativo' ? 'Vendas Abertas' : 'Planejamento'}
                      </span>
                    </div>

                    {/* Event Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {[
                        { value: evento.vendidos, label: 'Vendidos' },
                        { value: evento.disponivel, label: 'Disponíveis' },
                        { value: formatCurrency(evento.arrecadado), label: 'Arrecadado' },
                        { value: `${evento.ocupacao}%`, label: 'Ocupação' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center p-3 rounded-lg" style={{ backgroundColor: ROTARY_COLORS.surface }}>
                          <div className="text-lg font-semibold" style={{ color: ROTARY_COLORS.primary }}>{stat.value}</div>
                          <div className="text-xs" style={{ color: ROTARY_COLORS.textSecondary }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2" style={{ color: ROTARY_COLORS.textSecondary }}>
                        <span>Progresso de Vendas</span>
                        <span>{evento.ocupacao}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ backgroundColor: ROTARY_COLORS.border }}>
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${evento.ocupacao}%`, 
                            backgroundColor: ROTARY_COLORS.primary 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-xl shadow p-6" style={{ border: `1px solid ${ROTARY_COLORS.border}` }}>
            <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: `2px solid ${ROTARY_COLORS.surface}` }}>
              <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: ROTARY_COLORS.primary }}>
                <i className="fas fa-calendar-alt"></i>
                Gestão de Eventos
              </h2>
              <button 
                onClick={() => showModal('createEvent')}
                className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2"
                style={{ backgroundColor: ROTARY_COLORS.primary }}
              >
                <i className="fas fa-plus"></i>
                Novo Evento
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${ROTARY_COLORS.border}` }}>
              <table className="w-full">
                <thead style={{ backgroundColor: ROTARY_COLORS.surface }}>
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: ROTARY_COLORS.primary }}>Evento</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: ROTARY_COLORS.primary }}>Data/Hora</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: ROTARY_COLORS.primary }}>Local</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: ROTARY_COLORS.primary }}>Capacidade</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: ROTARY_COLORS.primary }}>Vendidos</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: ROTARY_COLORS.primary }}>Status</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: ROTARY_COLORS.primary }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.eventos.map((evento, index) => (
                    <tr 
                      key={evento.id} 
                      className="hover:bg-opacity-20 transition-colors"
                      style={{ 
                        borderBottom: `1px solid ${ROTARY_COLORS.border}`,
                        '&:hover': { backgroundColor: 'rgba(23, 69, 143, 0.02)' }
                      }}
                    >
                      <td className="px-4 py-4">
                        <div>
                          <strong>{evento.emoji} {evento.nome}</strong>
                          <br />
                          <small style={{ color: ROTARY_COLORS.textSecondary }}>Tradicional {evento.nome.toLowerCase()}</small>
                        </div>
                      </td>
                      <td className="px-4 py-4">{formatDate(evento.data)}</td>
                      <td className="px-4 py-4">{evento.local}</td>
                      <td className="px-4 py-4">{evento.capacidade}</td>
                      <td className="px-4 py-4">{evento.vendidos}</td>
                      <td className="px-4 py-4">
                        <span 
                          className={`px-2 py-1 rounded-xl text-xs font-medium ${
                            evento.status === 'ativo' ? 'text-white' : 'text-white'
                          }`}
                          style={{ 
                            backgroundColor: evento.status === 'ativo' ? ROTARY_COLORS.success : ROTARY_COLORS.warning
                          }}
                        >
                          {evento.status === 'ativo' ? 'Ativo' : 'Planejamento'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button 
                          onClick={() => showModal('eventDetails')}
                          className="px-3 py-1 rounded border-2 font-medium text-sm hover:bg-opacity-10 transition-all"
                          style={{ 
                            borderColor: ROTARY_COLORS.primary,
                            color: ROTARY_COLORS.primary
                          }}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: formatCurrency(22530), label: 'Faturamento Total', icon: 'fas fa-coins' },
                { value: formatCurrency(14280), label: 'PIX Recebido', icon: 'fas fa-mobile-alt' },
                { value: formatCurrency(8250), label: 'Cartão Recebido', icon: 'fas fa-credit-card' },
                { value: formatCurrency(387.80), label: 'Taxas Bancárias', icon: 'fas fa-percentage' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="relative p-6 rounded-xl text-white text-center overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${ROTARY_COLORS.primary} 0%, ${ROTARY_COLORS.blueMono} 100%)`,
                    boxShadow: '0 2px 8px rgba(23, 69, 143, 0.1)'
                  }}
                >
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                  <i className={`${stat.icon} absolute bottom-4 right-4 text-2xl opacity-30`}></i>
                </div>
              ))}
            </div>

            {/* Chart Container */}
            <div className="bg-white rounded-xl shadow p-6" style={{ border: `1px solid ${ROTARY_COLORS.border}` }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: ROTARY_COLORS.primary }}>Vendas por Evento</h3>
              <div 
                className="h-64 rounded-lg flex items-center justify-center border-2 border-dashed"
                style={{ 
                  backgroundColor: ROTARY_COLORS.surface,
                  borderColor: ROTARY_COLORS.border 
                }}
              >
                <div className="text-center" style={{ color: ROTARY_COLORS.textSecondary }}>
                  <i className="fas fa-chart-bar text-5xl mb-4 block"></i>
                  <p className="font-medium">Gráfico de Vendas por Evento</p>
                  <small>Costelada: {formatCurrency(17350)} • Porco Rolete: {formatCurrency(5180)}</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How It Works Tab */}
        {activeTab === 'how-it-works' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow p-6" style={{ border: `1px solid ${ROTARY_COLORS.border}` }}>
              <div className="mb-6 pb-4" style={{ borderBottom: `2px solid ${ROTARY_COLORS.surface}` }}>
                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: ROTARY_COLORS.primary }}>
                  <i className="fas fa-info-circle"></i>
                  Como Funciona o Sistema de Gestão
                </h2>
              </div>

              <div className="p-4 rounded-lg mb-6 flex items-center gap-3" style={{ backgroundColor: '#d4edda', color: '#155724', border: `1px solid ${ROTARY_COLORS.success}` }}>
                <i className="fas fa-rocket text-xl"></i>
                <div>
                  <strong>Sistema em Piloto Gratuito!</strong> Durante os primeiros 3 meses, você paga apenas as taxas bancárias (PIX R$ 0,40 por transação).
                </div>
              </div>

              {/* Modelos de Venda */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl shadow p-6" style={{ border: `1px solid ${ROTARY_COLORS.border}`, borderLeft: `4px solid ${ROTARY_COLORS.primary}` }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: ROTARY_COLORS.primary }}>
                    <i className="fas fa-print"></i>
                    Convites Físicos
                  </h3>
                  <div className="space-y-3">
                    <p><strong>Códigos:</strong> F001 até F500</p>
                    <div>
                      <p className="font-medium mb-2">Como Funciona:</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Alessandro distribui quotas para companheiros</li>
                        <li>• Companheiros vendem presencialmente</li>
                        <li>• Cliente paga em dinheiro, PIX ou cartão</li>
                        <li>• Sistema registra a venda instantaneamente</li>
                        <li>• QR Code único é impresso no convite</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(23, 69, 143, 0.05)', border: `2px solid ${ROTARY_COLORS.secondary}` }}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: ROTARY_COLORS.primary }}>
                      <i className="fas fa-handshake"></i>
                      Vantagens
                    </h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Mantém tradição e relacionamento pessoal</li>
                      <li>• Controle rigoroso de numeração</li>
                      <li>• Pode ser presenteado fisicamente</li>
                      <li>• Zero risco de inadimplência na portaria</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6" style={{ border: `1px solid ${ROTARY_COLORS.border}`, borderLeft: `4px solid ${ROTARY_COLORS.secondary}` }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: ROTARY_COLORS.secondary }}>
                    <i className="fas fa-mobile-alt"></i>
                    Convites Digitais
                  </h3>
                  <div className="space-y-3">
                    <p><strong>Códigos:</strong> D001 até D500</p>
                    <div>
                      <p className="font-medium mb-2">Como Funciona:</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• Link único gerado automaticamente</li>
                        <li>• Compartilhamento via WhatsApp/Email/Redes</li>
                        <li>• Cliente acessa, paga e recebe QR Code</li>
                        <li>• Pagamento processado instantaneamente</li>
                        <li>• QR Code direto no celular do cliente</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(247, 168, 27, 0.05)', border: `2px solid ${ROTARY_COLORS.secondary}` }}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: ROTARY_COLORS.secondary }}>
                      <i className="fas fa-rocket"></i>
                      Vantagens
                    </h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Venda 24/7 sem intermediários</li>
                      <li>• Alcance ilimitado via redes sociais</li>
                      <li>• Zero inadimplência (pago = liberado)</li>
                      <li>• Rastreamento completo de origem da venda</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow p-6" style={{ border: `1px solid ${ROTARY_COLORS.border}` }}>
            <div className="mb-6 pb-4" style={{ borderBottom: `2px solid ${ROTARY_COLORS.surface}` }}>
              <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: ROTARY_COLORS.primary }}>
                <i className="fas fa-file-alt"></i>
                Relatórios Automáticos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Relatório Financeiro', desc: 'Receitas por forma de pagamento, taxas e líquido por evento', icon: 'fas fa-chart-pie', color: ROTARY_COLORS.primary },
                { title: 'Relatório de Presença', desc: 'Check-ins realizados, lista de presença e ausências', icon: 'fas fa-users', color: ROTARY_COLORS.secondary },
                { title: 'Performance de Vendas', desc: 'Vendas por companheiro, metas e comissões', icon: 'fas fa-chart-line', color: ROTARY_COLORS.interactBlue },
                { title: 'Resumo Completo', desc: 'Análise completa do evento com todos os indicadores', icon: 'fas fa-calendar-check', color: ROTARY_COLORS.success }
              ].map((report, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow p-6 text-center cursor-pointer hover:shadow-lg transition-all"
                  style={{ border: `1px solid ${ROTARY_COLORS.border}` }}
                >
                  <i className={`${report.icon} text-5xl mb-4`} style={{ color: report.color }}></i>
                  <h3 className="font-semibold mb-2" style={{ color: ROTARY_COLORS.textPrimary }}>{report.title}</h3>
                  <p className="text-sm mb-4" style={{ color: ROTARY_COLORS.textSecondary }}>{report.desc}</p>
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 mx-auto"
                    style={{ backgroundColor: report.color }}
                  >
                    <i className="fas fa-download"></i>
                    Gerar Relatório
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal Overlay */}
      {activeModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: `2px solid ${ROTARY_COLORS.surface}` }}>
                <h2 className="text-xl font-semibold" style={{ color: ROTARY_COLORS.primary }}>
                  <i className="fas fa-calendar-plus mr-2"></i>
                  {activeModal === 'createEvent' ? 'Criar Novo Evento' : 'Detalhes'}
                </h2>
                <button 
                  onClick={closeModal}
                  className="text-2xl hover:bg-gray-100 p-2 rounded-full transition-colors"
                  style={{ color: ROTARY_COLORS.textSecondary }}
                >
                  ×
                </button>
              </div>
              
              {activeModal === 'createEvent' && (
                <form className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2" style={{ color: ROTARY_COLORS.primary }}>Nome do Evento</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border-2 rounded-lg focus:outline-none transition-colors"
                      style={{ borderColor: ROTARY_COLORS.border }}
                      placeholder="Ex: Costelada Rotary"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: ROTARY_COLORS.primary }}>Data e Hora</label>
                    <input 
                      type="datetime-local" 
                      className="w-full p-3 border-2 rounded-lg focus:outline-none"
                      style={{ borderColor: ROTARY_COLORS.border }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2" style={{ color: ROTARY_COLORS.primary }}>Valor Inteira (R$)</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="w-full p-3 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: ROTARY_COLORS.border }}
                        placeholder="100.00"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2" style={{ color: ROTARY_COLORS.primary }}>Valor Meia (R$)</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="w-full p-3 border-2 rounded-lg focus:outline-none"
                        style={{ borderColor: ROTARY_COLORS.border }}
                        placeholder="50.00"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={closeModal}
                      className="flex-1 px-4 py-3 rounded-lg font-medium border-2 transition-all"
                      style={{ 
                        borderColor: ROTARY_COLORS.primary,
                        color: ROTARY_COLORS.primary
                      }}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-4 py-3 rounded-lg font-medium text-white transition-all"
                      style={{ backgroundColor: ROTARY_COLORS.primary }}
                    >
                      <i className="fas fa-save mr-2"></i>
                      Criar Evento
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            Sistema de Convites - Rotary Club Itaquaquecetuba | Distrito 4563
          </p>
          <p className="text-sm text-gray-400 mt-2">
            "Servir é a renda que pagamos pelo espaço que ocupamos na Terra" ✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RotaryDashboard;
