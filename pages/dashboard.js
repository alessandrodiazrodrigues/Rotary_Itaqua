// pages/dashboard.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { CONFIG } from '../config/settings' // ✅ CAMINHO CORRIGIDO

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats] = useState({
    eventos: 2,
    convites: 265,
    receita: 22530,
    checkin: 89
  })

  // Dados simulados dos eventos
  const eventos = [
    {
      id: 'EVT001',
      nome: 'Costelada Rotary',
      emoji: '🥩',
      data: '15/12/2024 - 12h00',
      local: 'Roda d\'Água',
      status: 'ativo',
      vendidos: 187,
      disponivel: 113,
      arrecadado: 17350,
      ocupacao: 62,
      valor_inteira: 100.00,
      valor_meia: 50.00
    },
    {
      id: 'EVT002',
      nome: 'Porco no Rolete',
      emoji: '🐷',
      data: '22/12/2024 - 11h30',
      local: 'Roda d\'Água',
      status: 'planejamento',
      vendidos: 78,
      disponivel: 222,
      arrecadado: 5180,
      ocupacao: 26,
      valor_inteira: 70.00,
      valor_meia: 35.00
    }
  ]

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Dashboard - {CONFIG.CLUB_NAME}</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - {CONFIG.CLUB_NAME}</title>
        <meta name="description" content="Dashboard de controle do sistema de convites" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <div className="w-15 h-15 rounded-full flex items-center justify-center text-xs font-bold text-center leading-tight bg-white text-blue-900 p-2">
                  ROTARY<br/>ITAQUÁ<br/>{CONFIG.DISTRICT}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold">{CONFIG.CLUB_NAME}</h1>
                  <p className="text-sm opacity-90">Distrito {CONFIG.DISTRICT} • Sistema de Gestão de Convites</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span className="hidden sm:block">Alessandro Rodrigues</span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-yellow-500">
                  AR
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex overflow-x-auto">
              {[
                { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
                { id: 'events', icon: 'fas fa-calendar-alt', label: 'Eventos' },
                { id: 'invites', icon: 'fas fa-ticket-alt', label: 'Convites' },
                { id: 'sales', icon: 'fas fa-chart-line', label: 'Vendas' },
                { id: 'members', icon: 'fas fa-users', label: 'Companheiros' },
                { id: 'reports', icon: 'fas fa-file-alt', label: 'Relatórios' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center gap-2 border-b-3 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-blue-900 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-blue-900 hover:bg-blue-50'
                  }`}
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
                  { value: stats.eventos, label: 'Eventos Ativos', icon: 'fas fa-calendar-check', bg: 'bg-blue-600' },
                  { value: stats.convites, label: 'Convites Vendidos', icon: 'fas fa-ticket-alt', bg: 'bg-green-600' },
                  { value: formatCurrency(stats.receita), label: 'Faturamento Total', icon: 'fas fa-coins', bg: 'bg-yellow-600' },
                  { value: `${stats.checkin}%`, label: 'Taxa Check-in', icon: 'fas fa-chart-pie', bg: 'bg-purple-600' }
                ].map((stat, index) => (
                  <div key={index} className={`${stat.bg} text-white p-6 rounded-xl shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                      <i className={`${stat.icon} text-3xl opacity-80`}></i>
                    </div>
                  </div>
                ))}
              </div>

              {/* Eventos Ativos */}
              <div className="bg-white rounded-xl shadow p-6 mb-8">
                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-900">
                    <i className="fas fa-calendar-alt"></i>
                    Eventos Ativos
                  </h2>
                  <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <i className="fas fa-plus"></i>
                    Novo Evento
                  </button>
                </div>

                <div className="space-y-6">
                  {eventos.map((evento) => (
                    <div key={evento.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {evento.emoji} {evento.nome}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <i className="fas fa-calendar"></i>
                              {evento.data}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="fas fa-map-marker-alt"></i>
                              {evento.local}
                            </span>
                          </div>
                          <div className="mt-2 p-3 rounded-lg bg-gray-50">
                            <strong>💰 Valores:</strong> Inteira {formatCurrency(evento.valor_inteira)} • Meia (5-12 anos) {formatCurrency(evento.valor_meia)}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          evento.status === 'ativo' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {evento.status === 'ativo' ? 'Vendas Abertas' : 'Planejamento'}
                        </span>
                      </div>

                      {/* Event Stats */}
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

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2 text-gray-600">
                          <span>Progresso de Vendas</span>
                          <span>{evento.ocupacao}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full transition-all duration-500 bg-blue-900"
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

          {/* Outras Tabs Simplificadas */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className={`fas fa-${activeTab === 'events' ? 'calendar-alt' : activeTab === 'invites' ? 'ticket-alt' : activeTab === 'sales' ? 'chart-line' : activeTab === 'members' ? 'users' : 'file-alt'}`}></i>
                {activeTab === 'events' && 'Gestão de Eventos'}
                {activeTab === 'invites' && 'Gestão de Convites'}
                {activeTab === 'sales' && 'Dashboard de Vendas'}
                {activeTab === 'members' && 'Gestão de Companheiros'}
                {activeTab === 'reports' && 'Relatórios Automáticos'}
              </h2>
              <div className="text-center py-12">
                <i className={`fas fa-${activeTab === 'events' ? 'calendar-alt' : activeTab === 'invites' ? 'ticket-alt' : activeTab === 'sales' ? 'chart-line' : activeTab === 'members' ? 'users' : 'file-alt'} text-6xl text-gray-300 mb-4`}></i>
                <p className="text-gray-500 text-lg">Funcionalidade em desenvolvimento...</p>
                <p className="text-gray-400 text-sm mt-2">Esta seção será implementada nas próximas versões</p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-300">
              Sistema de Convites - {CONFIG.CLUB_NAME} | Distrito {CONFIG.DISTRICT}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              "Servir é a renda que pagamos pelo espaço que ocupamos na Terra" ✨
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
