// pages/dashboard.js - VERSÃO CORRIGIDA
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';
import Navigation from '../components/layout/Navigation';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import Alert from '../components/common/Alert';
import { authService } from '../lib/auth';

// Importar recharts dinamicamente
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

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboard, setDashboard] = useState(null);
  
  // Estados dos modais
  const [showEventModal, setShowEventModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
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
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }
    setUser(authService.getCurrentUser());
    loadDashboardData();
  }, [router]);

  // Controlar aba ativa via query param
  useEffect(() => {
    const tab = router.query.tab || 'dashboard';
    setActiveTab(tab);
  }, [router.query.tab]);

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
          },
          {
            id: 'F203',
            evento: 'Costelada Rotary',
            tipo: 'Físico',
            companheiro: 'Carlos Santos',
            cliente: 'Ana Souza (Meia)',
            valor: 50.00,
            status: 'pago',
            checkin: '12:10',
            data_venda: '2024-11-19T16:45:00'
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

  // Modal de Evento
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
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
      if (event) {
        setFormData({
          nome: event.nome,
          data: event.data?.slice(0, 16) || '',
          local: event.local,
          capacidade: event.capacidade,
          valor_inteira: event.valor_inteira,
          valor_meia: event.valor_meia,
          descricao: event.descricao || ''
        });
      } else {
        setFormData({
          nome: '',
          data: '',
          local: 'Roda d\'Água',
          capacidade: 300,
          valor_inteira: 100.00,
          valor_meia: 50.00,
          descricao: ''
        });
      }
    }, [event, isOpen]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setModalLoading(true);
      
      setTimeout(() => {
        alert(`${event ? 'Evento atualizado' : 'Evento criado'} com sucesso!\n\n${formData.nome}\n${formatDate(formData.data)}\n${formData.local}`);
        onClose();
        setModalLoading(false);
        loadDashboardData();
      }, 1500);
    };

    const handleChange = (e) => {
      const { name, value, type } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} title={event ? 'Editar Evento' : 'Criar Novo Evento'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Evento *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: Festa Julina Rotary"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data e Hora *</label>
              <input
                type="datetime-local"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Local *</label>
              <input
                type="text"
                name="local"
                value={formData.local}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacidade *</label>
              <input
                type="number"
                name="capacidade"
                value={formData.capacidade}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor Inteira (R$) *</label>
              <input
                type="number"
                name="valor_inteira"
                value={formData.valor_inteira}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor Meia (R$) *</label>
              <input
                type="number"
                name="valor_meia"
                value={formData.valor_meia}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={3}
                placeholder="Descrição do evento..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">📋 Preview do Evento</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>🎪 Nome:</strong> {formData.nome || 'Nome do evento'}</p>
              <p><strong>📅 Data:</strong> {formData.data ? formatDate(formData.data) : 'Data não definida'}</p>
              <p><strong>📍 Local:</strong> {formData.local}</p>
              <p><strong>👥 Capacidade:</strong> {formData.capacidade} pessoas</p>
              <p><strong>💰 Valores:</strong> Inteira {formatCurrency(formData.valor_inteira)} • Meia {formatCurrency(formData.valor_meia)}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={onClose} disabled={modalLoading}>
              Cancelar
            </Button>
            <Button type="submit" loading={modalLoading} className="flex-1">
              {event ? 'Atualizar Evento' : 'Criar Evento'}
            </Button>
          </div>
        </form>
      </Modal>
    );
  };

  // Modal de Companheiro
  const MemberModal = ({ isOpen, onClose, member = null }) => {
    const [formData, setFormData] = useState({
      nome: '',
      email: '',
      telefone: '',
      quota_fisica: 30,
      quota_digital: 30
    });
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
      if (member) {
        setFormData({
          nome: member.nome,
          email: member.email,
          telefone: member.telefone,
          quota_fisica: member.quota_fisica || 30,
          quota_digital: member.quota_digital || 30
        });
      } else {
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          quota_fisica: 30,
          quota_digital: 30
        });
      }
    }, [member, isOpen]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setModalLoading(true);
      
      setTimeout(() => {
        alert(`${member ? 'Companheiro atualizado' : 'Companheiro adicionado'} com sucesso!\n\n${formData.nome}\n${formData.email}`);
        onClose();
        setModalLoading(false);
        loadDashboardData();
      }, 1500);
    };

    const handleChange = (e) => {
      const { name, value, type } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) || 0 : value
      }));
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} title={member ? 'Editar Companheiro' : 'Adicionar Companheiro'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: João Silva"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="joao.silva@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-1234"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quota Físicos</label>
              <input
                type="number"
                name="quota_fisica"
                value={formData.quota_fisica}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quota Digitais</label>
              <input
                type="number"
                name="quota_digital"
                value={formData.quota_digital}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">📊 Resumo das Quotas</h4>
            <div className="text-sm text-green-800">
              <p><strong>Total de convites:</strong> {formData.quota_fisica + formData.quota_digital}</p>
              <p><strong>Físicos:</strong> F{String(1).padStart(3, '0')} a F{String(formData.quota_fisica).padStart(3, '0')}</p>
              <p><strong>Digitais:</strong> D{String(1).padStart(3, '0')} a D{String(formData.quota_digital).padStart(3, '0')}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={onClose} disabled={modalLoading}>
              Cancelar
            </Button>
            <Button type="submit" loading={modalLoading} className="flex-1">
              {member ? 'Atualizar Companheiro' : 'Adicionar Companheiro'}
            </Button>
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

  return (
    <Layout title="Dashboard" user={user} showNavigation={false}>
      {/* ✅ USAR APENAS O COMPONENTE NAVIGATION */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Content */}
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
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          evento.status === 'ativo' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {evento.status === 'ativo' ? 'Vendas Abertas' : 'Planejamento'}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedEvent(evento);
                            setShowEventModal(true);
                          }}
                          icon="fas fa-edit"
                        >
                          Editar
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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

                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progresso de Vendas</span>
                        <span>{evento.ocupacao}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${evento.ocupacao}%` }}
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
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Gestão de Eventos</h2>
              <Button onClick={() => setShowEventModal(true)} icon="fas fa-plus">
                Novo Evento
              </Button>
            </div>

            <Table
              columns={[
                { key: 'nome', label: 'Evento', render: (value, item) => (
                  <div>
                    <div className="font-medium">{item.emoji} {value}</div>
                    <div className="text-sm text-gray-500">{item.descricao}</div>
                  </div>
                )},
                { key: 'data', label: 'Data/Hora', render: (value) => formatDate(value) },
                { key: 'local', label: 'Local' },
                { key: 'capacidade', label: 'Capacidade', render: (value) => `${value} pessoas` },
                { key: 'vendidos', label: 'Vendidos' },
                { key: 'status', label: 'Status', render: (value) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    value === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {value === 'ativo' ? 'Ativo' : 'Planejamento'}
                  </span>
                )},
                { key: 'actions', label: 'Ações', sortable: false, render: (_, item) => (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedEvent(item);
                      setShowEventModal(true);
                    }}
                    icon="fas fa-edit"
                  >
                    Editar
                  </Button>
                )}
              ]}
              data={dashboard.eventos}
            />
          </div>
        )}

        {/* Outras abas (copiadas do código original, sem modificações) */}
        {activeTab === 'invites' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { value: '150', label: 'Convites Físicos', icon: 'fas fa-print', color: 'bg-blue-600' },
                { value: '115', label: 'Convites Digitais', icon: 'fas fa-mobile-alt', color: 'bg-green-600' },
                { value: '236', label: 'Check-ins Realizados', icon: 'fas fa-qrcode', color: 'bg-yellow-600' },
                { value: '29', label: 'Não Compareceram', icon: 'fas fa-user-times', color: 'bg-red-600' }
              ].map((stat, index) => (
                <div key={index} className={`${stat.color} text-white p-6 rounded-xl shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm opacity-90">{stat.label}</p>
                    </div>
                    <i className={`${stat.icon} text-2xl opacity-80`}></i>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestão de Convites</h2>
                <div className="flex gap-2">
                  <Button variant="secondary" icon="fas fa-eye">
                    Preview Convite
                  </Button>
                  <Button icon="fas fa-magic">
                    Gerar Convites
                  </Button>
                </div>
              </div>

              <Table
                columns={[
                  { key: 'id', label: 'Código', render: (value) => <span className="font-mono font-bold">{value}</span> },
                  { key: 'evento', label: 'Evento' },
                  { key: 'tipo', label: 'Tipo', render: (value) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value === 'Físico' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {value}
                    </span>
                  )},
                  { key: 'companheiro', label: 'Companheiro' },
                  { key: 'cliente', label: 'Cliente' },
                  { key: 'valor', label: 'Valor', render: (value) => formatCurrency(value) },
                  { key: 'status', label: 'Status', render: (value) => (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Pago
                    </span>
                  )},
                  { key: 'checkin', label: 'Check-in', render: (value) => (
                    value ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <i className="fas fa-check"></i>
                        {value}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        <i className="fas fa-minus"></i>
                      </span>
                    )
                  )}
                ]}
                data={dashboard.convites}
              />
            </div>
          </div>
        )}

        {/* Sales Tab */}
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
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Evento</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboard.vendas_chart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="evento" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="vendas" fill="#17458f" />
                    <Bar dataKey="meta" fill="#f7a81b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Formas de Pagamento</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dashboard.pagamentos_chart}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {dashboard.pagamentos_chart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#17458f' : '#f7a81b'} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Companheiro</h3>
              <Table
                columns={[
                  { key: 'nome', label: 'Companheiro' },
                  { key: 'vendas_total', label: 'Vendidos', render: (value) => `${value} convites` },
                  { key: 'valor_total', label: 'Valor Total', render: (_, item) => formatCurrency(item.vendas_total * 85) },
                  { key: 'comissao', label: 'Comissão', render: (value) => formatCurrency(value) },
                  { key: 'meta_atingida', label: 'Meta', render: (value) => (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${value >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${value >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {value}%
                      </span>
                    </div>
                  )}
                ]}
                data={dashboard.companheiros}
              />
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Gestão de Companheiros</h2>
              <Button onClick={() => setShowMemberModal(true)} icon="fas fa-user-plus">
                Adicionar Companheiro
              </Button>
            </div>

            <Table
              columns={[
                { key: 'nome', label: 'Nome', render: (value, item) => (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {value.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium">{value}</div>
                      <div className="text-sm text-gray-500">{item.email}</div>
                    </div>
                  </div>
                )},
                { key: 'telefone', label: 'Telefone', render: (value) => formatPhone(value) },
                { key: 'quota_atual', label: 'Quota', render: (value) => `${value} convites` },
                { key: 'vendas_total', label: 'Vendas', render: (value) => `${value} vendidos` },
                { key: 'comissao', label: 'Comissão', render: (value) => formatCurrency(value) },
                { key: 'status', label: 'Status', render: (value) => (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Ativo
                  </span>
                )},
                { key: 'actions', label: 'Ações', sortable: false, render: (_, item) => (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedMember(item);
                      setShowMemberModal(true);
                    }}
                    icon="fas fa-edit"
                  >
                    Editar
                  </Button>
                )}
              ]}
              data={dashboard.companheiros}
            />
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Relatório Financeiro',
                description: 'Receitas por forma de pagamento, taxas e líquido por evento',
                icon: 'fas fa-chart-pie',
                color: 'text-blue-600 bg-blue-50'
              },
              {
                title: 'Relatório de Presença',
                description: 'Check-ins realizados, lista de presença e ausências',
                icon: 'fas fa-users',
                color: 'text-green-600 bg-green-50'
              },
              {
                title: 'Performance de Vendas',
                description: 'Vendas por companheiro, metas e comissões',
                icon: 'fas fa-chart-line',
                color: 'text-yellow-600 bg-yellow-50'
              },
              {
                title: 'Resumo Completo',
                description: 'Análise completa do evento com todos os indicadores',
                icon: 'fas fa-file-alt',
                color: 'text-purple-600 bg-purple-50'
              },
              {
                title: 'Exportação de Dados',
                description: 'Baixar dados em formato Excel ou CSV',
                icon: 'fas fa-download',
                color: 'text-indigo-600 bg-indigo-50'
              },
              {
                title: 'Dashboard Executivo',
                description: 'Visão estratégica para apresentações',
                icon: 'fas fa-presentation',
                color: 'text-red-600 bg-red-50'
              }
            ].map((report, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center mb-4`}>
                  <i className={`${report.icon} text-xl`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <Button variant="outline" size="sm" fullWidth icon="fas fa-download">
                  Gerar Relatório
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <EventModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />

      <MemberModal
        isOpen={showMemberModal}
        onClose={() => {
          setShowMemberModal(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
      />
    </Layout>
  );
};

export default Dashboard;
