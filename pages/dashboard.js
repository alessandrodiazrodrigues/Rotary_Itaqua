// pages/dashboard.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { CONFIG } from '../config/settings'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats] = useState({
    eventos: 2,
    convites: 265,
    receita: 22530,
    checkin: 89
  })

  // Estados para modais
  const [showEventModal, setShowEventModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showMemberModal, setShowMemberModal] = useState(false)

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
      valor_meia: 50.00,
      capacidade: 300
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
      valor_meia: 35.00,
      capacidade: 300
    }
  ]

  // Dados simulados dos convites
  const convites = [
    {
      codigo: 'F147',
      evento: 'Costelada Rotary',
      tipo: 'Físico',
      companheiro: 'João Silva',
      cliente: 'Maria Santos',
      valor: 100.00,
      status: 'pago',
      checkin: '11:45',
      data_venda: '20/11/2024'
    },
    {
      codigo: 'D089',
      evento: 'Porco no Rolete',
      tipo: 'Digital',
      companheiro: 'Ana Costa',
      cliente: 'Pedro Oliveira',
      valor: 70.00,
      status: 'pago',
      checkin: null,
      data_venda: '18/11/2024'
    },
    {
      codigo: 'F203',
      evento: 'Costelada Rotary',
      tipo: 'Físico',
      companheiro: 'Carlos Santos',
      cliente: 'Ana Souza (Meia)',
      valor: 50.00,
      status: 'pago',
      checkin: '12:10',
      data_venda: '19/11/2024'
    }
  ]

  // Dados simulados dos companheiros
  const companheiros = [
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
  ]

  // Dados de vendas
  const vendasData = [
    { evento: 'Costelada', vendas: 187, meta: 300 },
    { evento: 'Porco Rolete', vendas: 78, meta: 300 }
  ]

  const pagamentosData = [
    { tipo: 'PIX', valor: 14280, percentual: 63.4 },
    { tipo: 'Cartão', valor: 8250, percentual: 36.6 }
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

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
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
                  <button 
                    onClick={() => setShowEventModal(true)}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
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

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-blue-900"></i>
                  Gestão de Eventos
                </h2>
                <button 
                  onClick={() => setShowEventModal(true)}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <i className="fas fa-plus"></i>
                  Novo Evento
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Evento</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Data/Hora</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Local</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Capacidade</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Vendidos</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventos.map((evento) => (
                      <tr key={evento.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {evento.emoji} {evento.nome}
                            </div>
                            <div className="text-sm text-gray-500">Tradicional almoço do clube</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{evento.data}</td>
                        <td className="py-4 px-4 text-gray-700">{evento.local}</td>
                        <td className="py-4 px-4 text-gray-700">{evento.capacidade}</td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-blue-900">{evento.vendidos}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            evento.status === 'ativo' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {evento.status === 'ativo' ? 'Ativo' : 'Planejamento'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            <i className="fas fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Invites Tab */}
          {activeTab === 'invites' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { value: 150, label: 'Convites Físicos', icon: 'fas fa-print', bg: 'bg-blue-600' },
                  { value: 115, label: 'Convites Digitais', icon: 'fas fa-mobile-alt', bg: 'bg-green-600' },
                  { value: 236, label: 'Check-ins Realizados', icon: 'fas fa-qrcode', bg: 'bg-yellow-600' },
                  { value: 29, label: 'Não Compareceram', icon: 'fas fa-user-times', bg: 'bg-red-600' }
                ].map((stat, index) => (
                  <div key={index} className={`${stat.bg} text-white p-6 rounded-xl shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                      <i className={`${stat.icon} text-2xl opacity-80`}></i>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <i className="fas fa-ticket-alt text-blue-900"></i>
                    Gestão de Convites
                  </h2>
                  <div className="flex gap-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                      <i className="fas fa-eye"></i>
                      Visualizar Convite
                    </button>
                    <button 
                      onClick={() => setShowInviteModal(true)}
                      className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                      <i className="fas fa-magic"></i>
                      Gerar Convites
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Código</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Evento</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Companheiro</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Cliente</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Valor</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                      </tr>
                    </thead>
                    <tbody>
                      {convites.map((convite) => (
                        <tr key={convite.codigo} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <span className="font-semibold text-blue-900">{convite.codigo}</span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{convite.evento}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              convite.tipo === 'Físico' 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {convite.tipo}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{convite.companheiro}</td>
                          <td className="py-4 px-4 text-gray-700">{convite.cliente}</td>
                          <td className="py-4 px-4 text-gray-700">{formatCurrency(convite.valor)}</td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Pago
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {convite.checkin ? (
                              <span className="text-green-600">
                                <i className="fas fa-check mr-1"></i>
                                {convite.checkin}
                              </span>
                            ) : (
                              <span className="text-red-600">
                                <i className="fas fa-times mr-1"></i>
                                -
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sales Tab */}
          {activeTab === 'sales' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { value: formatCurrency(22530), label: 'Faturamento Total', icon: 'fas fa-coins', bg: 'bg-green-600' },
                  { value: formatCurrency(14280), label: 'PIX Recebido', icon: 'fas fa-mobile-alt', bg: 'bg-blue-600' },
                  { value: formatCurrency(8250), label: 'Cartão Recebido', icon: 'fas fa-credit-card', bg: 'bg-purple-600' },
                  { value: formatCurrency(387.80), label: 'Taxas Bancárias', icon: 'fas fa-percentage', bg: 'bg-red-600' }
                ].map((stat, index) => (
                  <div key={index} className={`${stat.bg} text-white p-6 rounded-xl shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                      <i className={`${stat.icon} text-2xl opacity-80`}></i>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Evento</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <i className="fas fa-chart-bar text-4xl mb-2"></i>
                      <p className="font-medium">Gráfico de Vendas</p>
                      <p className="text-sm">Costelada: 187 • Porco Rolete: 78</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Formas de Pagamento</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <i className="fas fa-chart-pie text-4xl mb-2"></i>
                      <p className="font-medium">Gráfico PIX vs Cartão</p>
                      <p className="text-sm">PIX: 63.4% • Cartão: 36.6%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendas por Companheiro */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Companheiro</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Companheiro</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Convites Vendidos</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Valor Total</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Comissão</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Meta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companheiros.map((companheiro) => (
                        <tr key={companheiro.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-semibold text-gray-900">{companheiro.nome}</div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{companheiro.vendas_total}</td>
                          <td className="py-4 px-4 text-gray-700">{formatCurrency(companheiro.vendas_total * 85)}</td>
                          <td className="py-4 px-4 text-gray-700">{formatCurrency(companheiro.comissao)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{companheiro.meta_atingida}%</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                companheiro.meta_atingida >= 80 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {companheiro.meta_atingida >= 80 ? 'Meta atingida' : 'Em progresso'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-users text-blue-900"></i>
                  Gestão de Companheiros
                </h2>
                <button 
                  onClick={() => setShowMemberModal(true)}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <i className="fas fa-user-plus"></i>
                  Adicionar Companheiro
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Telefone</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Quota Atual</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Vendas</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companheiros.map((companheiro) => (
                      <tr key={companheiro.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {companheiro.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div className="font-semibold text-gray-900">{companheiro.nome}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{companheiro.email}</td>
                        <td className="py-4 px-4 text-gray-700">{companheiro.telefone}</td>
                        <td className="py-4 px-4 text-gray-700">{companheiro.quota_atual} convites</td>
                        <td className="py-4 px-4 text-gray-700">{companheiro.vendas_total} vendidos</td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ativo
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-800">
                            <i className="fas fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <i className="fas fa-file-alt text-blue-900"></i>
                  Relatórios Automáticos
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Relatório Financeiro',
                    description: 'Receitas por forma de pagamento, taxas e líquido por evento',
                    icon: 'fas fa-chart-pie',
                    color: 'text-blue-600'
                  },
                  {
                    title: 'Relatório de Presença',
                    description: 'Check-ins realizados, lista de presença e ausências',
                    icon: 'fas fa-users',
                    color: 'text-yellow-600'
                  },
                  {
                    title: 'Performance de Vendas',
                    description: 'Vendas por companheiro, metas e comissões',
                    icon: 'fas fa-chart-line',
                    color: 'text-green-600'
                  },
                  {
                    title: 'Resumo Completo',
                    description: 'Análise completa do evento com todos os indicadores',
                    icon: 'fas fa-calendar-check',
                    color: 'text-purple-600'
                  }
                ].map((report, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-center">
                      <i className={`${report.icon} text-4xl ${report.color} mb-4`}></i>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                      <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors">
                        <i className="fas fa-download"></i>
                        Gerar Relatório
                      </button>
                    </div>
                  </div>
                ))}
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

      {/* Modals */}
      <Modal isOpen={showEventModal} onClose={() => setShowEventModal(false)} title="Criar Novo Evento">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Evento</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
              <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button type="button" onClick={() => setShowEventModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded-lg">
              Criar Evento
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="Gerar Convites">
        <div className="text-center py-8">
          <i className="fas fa-magic text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-600">Funcionalidade de geração de convites será implementada aqui.</p>
        </div>
      </Modal>

      <Modal isOpen={showMemberModal} onClose={() => setShowMemberModal(false)} title="Adicionar Companheiro">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex gap-4 mt-6">
            <button type="button" onClick={() => setShowMemberModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded-lg">
              Adicionar
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
