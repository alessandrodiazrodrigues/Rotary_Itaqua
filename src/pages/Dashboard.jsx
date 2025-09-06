import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config/settings';
import Button from '../components/common/Button';
import authService from '../services/auth';

/**
 * Dashboard Principal do Alessandro (Admin)
 * Visão geral completa do sistema
 */
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total_events: 0,
    total_invites: 0,
    total_revenue: 0,
    checkin_rate: 0
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Verificar autenticação e carregar dados
  useEffect(() => {
    if (!authService.isAuthenticated() || !authService.isAdmin()) {
      window.location.href = '/login';
      return;
    }

    const userData = authService.getUser();
    setUser(userData);
    loadDashboardData();
  }, []);

  // Carregar dados do dashboard
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Buscar estatísticas
      const statsResponse = await fetch(`${CONFIG.GOOGLE_SHEETS_API}?action=get_stats`);
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Buscar eventos
      const eventsResponse = await fetch(`${CONFIG.GOOGLE_SHEETS_API}?action=get_events`);
      const eventsData = await eventsResponse.json();
      setEvents(eventsData);

    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (confirm('Deseja realmente sair do sistema?')) {
      authService.logout();
    }
  };

  // Formatar valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Formatar datas
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo e título */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs"
                style={{ backgroundColor: CONFIG.COLORS.primary }}
              >
                RC
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">{CONFIG.CLUB_NAME}</p>
              </div>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Olá, <strong>{user?.name || 'Alessandro'}</strong>
              </span>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: CONFIG.COLORS.secondary }}
              >
                {user?.name?.charAt(0) || 'A'}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Eventos Ativos */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: CONFIG.COLORS.primary }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eventos Ativos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total_events}</p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>

          {/* Convites Vendidos */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: CONFIG.COLORS.secondary }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Convites Vendidos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total_invites}</p>
              </div>
              <div className="text-3xl">🎫</div>
            </div>
          </div>

          {/* Faturamento */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: CONFIG.COLORS.success }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faturamento Total</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total_revenue)}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          {/* Taxa Check-in */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: CONFIG.COLORS.info }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa Check-in</p>
                <p className="text-3xl font-bold text-gray-900">{stats.checkin_rate}%</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Visão Geral', icon: '📊' },
                { id: 'events', label: 'Eventos', icon: '🎪' },
                { id: 'members', label: 'Companheiros', icon: '👥' },
                { id: 'reports', label: 'Relatórios', icon: '📋' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Eventos Ativos</h2>
                  <Button variant="primary" icon="➕">
                    Novo Evento
                  </Button>
                </div>

                {/* Lista de Eventos */}
                <div className="space-y-4">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              🥩 {event.nome}
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Data:</span> {formatDate(event.data)}
                              </div>
                              <div>
                                <span className="font-medium">Local:</span> {event.local}
                              </div>
                              <div>
                                <span className="font-medium">Capacidade:</span> {event.capacidade} pessoas
                              </div>
                              <div>
                                <span className="font-medium">Valores:</span> R$ {event.valor_inteira} / R$ {event.valor_meia}
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-6">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              event.status === 'ativo' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                        </div>

                        {/* Estatísticas do Evento */}
                        <div className="mt-4 grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{event.vendidos || 0}</p>
                            <p className="text-xs text-gray-500">Vendidos</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-600">{(event.capacidade || 0) - (event.vendidos || 0)}</p>
                            <p className="text-xs text-gray-500">Disponíveis</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-green-600">{formatCurrency(event.arrecadado || 0)}</p>
                            <p className="text-xs text-gray-500">Arrecadado</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{Math.round(((event.vendidos || 0) / (event.capacidade || 1)) * 100)}%</p>
                            <p className="text-xs text-gray-500">Ocupação</p>
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm">
                            📊 Detalhes
                          </Button>
                          <Button variant="outline" size="sm">
                            ⚙️ Configurar
                          </Button>
                          <Button variant="outline" size="sm">
                            📱 Scanner Portaria
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">🎪</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum evento ativo</h3>
                      <p className="text-gray-600 mb-4">Crie seu primeiro evento para começar a vender convites</p>
                      <Button variant="primary" icon="➕">
                        Criar Primeiro Evento
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Outras tabs - placeholder */}
            {activeTab !== 'overview' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Em Desenvolvimento</h3>
                <p className="text-gray-600">Esta seção será implementada na próxima fase</p>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
