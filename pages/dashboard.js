// pages/dashboard.js - IMPORTS CORRIGIDOS PARA PRODUÇÃO
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Navigation from '../components/layout/Navigation';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import Alert from '../components/common/Alert';
import { authService } from '../lib/auth';

// ✅ CORREÇÃO: Imports condicionais para evitar erro SSR
const ChartComponents = {
  BarChart: null,
  Bar: null,
  XAxis: null,
  YAxis: null,
  CartesianGrid: null,
  Tooltip: null,
  ResponsiveContainer: null,
  PieChart: null,
  Pie: null,
  Cell: null,
};

// Carregamento dinâmico apenas no cliente
if (typeof window !== 'undefined') {
  import('recharts').then((recharts) => {
    ChartComponents.BarChart = recharts.BarChart;
    ChartComponents.Bar = recharts.Bar;
    ChartComponents.XAxis = recharts.XAxis;
    ChartComponents.YAxis = recharts.YAxis;
    ChartComponents.CartesianGrid = recharts.CartesianGrid;
    ChartComponents.Tooltip = recharts.Tooltip;
    ChartComponents.ResponsiveContainer = recharts.ResponsiveContainer;
    ChartComponents.PieChart = recharts.PieChart;
    ChartComponents.Pie = recharts.Pie;
    ChartComponents.Cell = recharts.Cell;
  });
}

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboard, setDashboard] = useState(null);
  const [chartsLoaded, setChartsLoaded] = useState(false);
  
  // Estados dos modais
  const [showEventModal, setShowEventModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const ROTARY_COLORS = {
    primary: '#17458f',
    secondary: '#f7a81b',
    blueMono: '#0067c8',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#17a2b8'
  };

  // Verificar autenticação
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!authService.isAuthenticated()) {
        router.push('/login');
        return;
      }
      setUser(authService.getCurrentUser());
      loadDashboardData();
      
      // Carregar charts após component montar
      setTimeout(() => setChartsLoaded(true), 1000);
    }
  }, [router]);

  // Controlar aba ativa via query param
  useEffect(() => {
    if (router.isReady) {
      const tab = router.query.tab || 'dashboard';
      setActiveTab(tab);
    }
  }, [router.query.tab, router.isReady]);

  // Carregar dados do dashboard
  const loadDashboardData = async () => {
    setLoading(true);
    
    // Simular carregamento de dados
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
            ocupacao: 62,
            descricao: 'Tradicional almoço do clube com costelada no rolete'
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
            ocupacao: 26,
            descricao: 'Evento gastronômico especial de fim de ano'
          }
        ],
        companheiros: [
          {
            id: 'COMP001',
            nome: 'João Silva',
            email: 'joao.silva@email.com',
            telefone: '(11) 99999-1234',
            quota_atual: 60,
            vendas_total: 52,
            comissao: 233.00,
            status: 'ativo',
            meta_atingida: 87
          },
          {
            id: 'COMP002',
            nome: 'Ana Costa',
            email: 'ana.costa@email.com',
            telefone: '(11) 98888-5678',
            quota_atual: 60,
            vendas_total: 41,
            comissao: 185.50,
            status: 'ativo',
            meta_atingida: 68
          },
          {
            id: 'COMP003',
            nome: 'Carlos Santos',
            email: 'carlos.santos@email.com',
            telefone: '(11) 97777-9012',
            quota_atual: 60,
            vendas_total: 59,
            comissao: 263.50,
            status: 'ativo',
            meta_atingida: 98
          }
        ],
        convites: [
          {
            id: 'F147',
            evento: 'Costelada Rotary',
            tipo: 'Físico',
            companheiro: 'João Silva',
            cliente: 'Maria Santos',
            valor: 100.00,
            status: 'pago',
            checkin: '11:45',
            data_venda: '2024-11-20T10:30:00'
          },
          {
            id: 'D089',
            evento: 'Porco no Rolete',
            tipo: 'Digital',
            companheiro: 'Ana Costa',
            cliente: 'Pedro Oliveira',
            valor: 70.00,
            status: 'pago',
            checkin: null,
            data_venda: '2024-11-18T14:20:00'
          }
        ],
        vendas_chart: [
          { evento: 'Costelada', vendas: 187, meta: 300 },
          { evento: 'Porco Rolete', vendas: 78, meta: 300 }
        ],
        pagamentos_chart: [
          { name: 'PIX', value: 14280, percentage: 63.4 },
          { name: 'Cartão', value: 8250, percentage: 36.6 }
        ]
      };
      
      setDashboard(mockData);
      setLoading(false);
    }, 1000);
  };

  // Função para mudar de aba
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    router.push(`/dashboard?tab=${tabId}`, undefined, { shallow: true });
  };

  // Utilitários
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

  const formatPhone = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  // Componente de Chart Placeholder
  const ChartPlaceholder = ({ title, data }) => (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <i className="fas fa-chart-bar text-4xl mb-2"></i>
          <p className="font-medium">Gráfico {title}</p>
          <p className="text-sm">Dados: {JSON.stringify(data)}</p>
        </div>
      </div>
    </div>
  );

  // Modal de Evento (versão simplificada para evitar erros)
  const EventModal = ({ isOpen, onClose, event = null }) => {
    const [formData, setFormData] = useState({
      nome: '',
      data: '',
      local: 'Roda d\'Água',
      capacidade: 300,
      valor_inteira: 100.00,
      valor_meia: 50.00,
      descricao: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      alert(`${event ? 'Evento atualizado' : 'Evento criado'} com sucesso!`);
      onClose();
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} title={event ? 'Editar Evento' : 'Criar Novo Evento'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Evento</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </Modal>
    );
  };

  if (loading) {
    return (
      <Layout title="Carregando..." user={user} showNavigation={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!dashboard) {
    return (
      <Layout title="Dashboard" user={user} showNavigation={false}>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Erro ao carregar dados...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" user={user} showNavigation={false}>
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { value: dashboard.resumo_geral.total_eventos, label: 'Eventos Ativos', icon: 'fas fa-calendar-check', color: 'bg-blue-600' },
                { value: dashboard.resumo_geral.total_convites, label: 'Convites Vendidos', icon: 'fas fa-ticket-alt', color: 'bg-green-600' },
                { value: formatCurrency(dashboard.resumo_geral.receita_total), label: 'Faturamento Total', icon: 'fas fa-coins', color: 'bg-yellow-600' },
                { value: `${dashboard.resumo_geral.taxa_checkin}%`, label: 'Taxa Check-in', icon: 'fas fa-chart-pie', color: 'bg-purple-600' }
              ].map((stat, index) => (
                <div key={index} className={`${stat.color} text-white p-6 rounded-xl shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm opacity-90">{stat.label}</p>
                    </div>
                    <i className={`${stat.icon} text-3xl opacity-80`}></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Eventos Ativos */}
            <div className="bg-white rounded-xl shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-blue-600"></i>
                  Eventos Ativos
                </h2>
                <Button onClick={() => setShowEventModal(true)} icon="fas fa-plus">
                  Novo Evento
                </Button>
              </div>

              <div className="space-y-6">
                {dashboard.eventos.map((evento) => (
                  <div key={evento.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {evento.emoji} {evento.nome}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <i className="fas fa-calendar"></i>
                            {formatDate(evento.data)}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-map-marker-alt"></i>
                            {evento.local}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{evento.descricao}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        evento.status === 'ativo' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {evento.status === 'ativo' ? 'Vendas Abertas' : 'Planejamento'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { value: evento.vendidos, label: 'Vendidos', color: 'text-green-600' },
                        { value: evento.disponivel, label: 'Disponíveis', color: 'text-blue-600' },
                        { value: formatCurrency(evento.arrecadado), label: 'Arrecadado', color: 'text-yellow-600' },
                        { value: `${evento.ocupacao}%`, label: 'Ocupação', color: 'text-purple-600' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className={`text-lg font-semibold ${stat.color}`}>{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Sales Tab com Charts Placeholder */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { value: formatCurrency(22530), label: 'Faturamento Total', icon: 'fas fa-coins', color: 'bg-green-600' },
                { value: formatCurrency(14280), label: 'PIX Recebido', icon: 'fas fa-mobile-alt', color: 'bg-blue-600' },
                { value: formatCurrency(8250), label: 'Cartão Recebido', icon: 'fas fa-credit-card', color: 'bg-purple-600' },
                { value: formatCurrency(387.80), label: 'Taxas Bancárias', icon: 'fas fa-percentage', color: 'bg-red-600' }
              ].map((stat, index) => (
                <div key={index} className={`${stat.color} text-white p-6 rounded-xl shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-sm opacity-90">{stat.label}</p>
                    </div>
                    <i className={`${stat.icon} text-2xl opacity-80`}></i>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartPlaceholder title="Vendas por Evento" data={dashboard.vendas_chart} />
              <ChartPlaceholder title="Formas de Pagamento" data={dashboard.pagamentos_chart} />
            </div>
          </div>
        )}

        {/* Outras abas simplificadas */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestão de Eventos</h2>
            <p className="text-gray-600">Lista de eventos será exibida aqui...</p>
          </div>
        )}

        {activeTab === 'invites' && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestão de Convites</h2>
            <p className="text-gray-600">Lista de convites será exibida aqui...</p>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestão de Companheiros</h2>
            <p className="text-gray-600">Lista de companheiros será exibida aqui...</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Relatórios</h2>
            <p className="text-gray-600">Relatórios serão exibidos aqui...</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        event={selectedEvent}
      />
    </Layout>
  );
};

export default Dashboard;
