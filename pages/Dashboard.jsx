'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importar recharts dinamicamente para evitar problemas de SSR
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });

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
            <p className="text-center text-gray-500 py-8">Funcionalidade de gestão de eventos em desenvolvimento...</p>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="bg-white rounded-xl shadow p-6" style={{ border: `1px solid ${ROTARY_COLORS.border}` }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: ROTARY_COLORS.primary }}>
              <i className="fas fa-chart-line mr-2"></i>
              Dashboard de Vendas
            </h2>
            <p className="text-center text-gray-500 py-8">Dashboard de vendas em desenvolvimento...</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow p-6" style={{ border: `1px solid ${ROTARY_COLORS.border}` }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: ROTARY_COLORS.primary }}>
              <i className="fas fa-file-alt mr-2"></i>
              Relatórios Automáticos
            </h2>
            <p className="text-center text-gray-500 py-8">Sistema de relatórios em desenvolvimento...</p>
          </div>
        )}
      </main>

      {/* Modal simplificado */}
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold" style={{ color: ROTARY_COLORS.primary }}>
                  Criar Novo Evento
                </h2>
                <button 
                  onClick={closeModal}
                  className="text-2xl hover:bg-gray-100 p-2 rounded-full transition-colors"
                  style={{ color: ROTARY_COLORS.textSecondary }}
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600">Funcionalidade em desenvolvimento...</p>
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
