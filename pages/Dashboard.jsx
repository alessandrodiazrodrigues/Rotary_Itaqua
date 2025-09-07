import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEventos: 0,
    totalConvites: 0,
    receitaTotal: 0,
    taxaCheckin: 0
  })
  
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setStats({
        totalEventos: 2,
        totalConvites: 265,
        receitaTotal: 22530,
        taxaCheckin: 89
      })
      
      setEventos([
        {
          id: 1,
          nome: "🥩 Costelada Rotary",
          data: "15/12/2024 - 12h00",
          local: "Roda d'Água",
          capacidade: 300,
          vendidos: 187,
          disponivel: 113,
          arrecadado: 17350,
          ocupacao: 62,
          status: "ativo"
        },
        {
          id: 2,
          nome: "🐷 Porco no Rolete", 
          data: "22/12/2024 - 11h30",
          local: "Roda d'Água",
          capacidade: 300,
          vendidos: 78,
          disponivel: 222,
          arrecadado: 5180,
          ocupacao: 26,
          status: "planejamento"
        }
      ])
      
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - Rotary Club Itaquaquecetuba</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-xs leading-tight">
                  ROTARY<br/>ITAQUÁ<br/>4563
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Rotary Club Itaquaquecetuba</h1>
                  <p className="text-blue-100">Distrito 4563 • Sistema de Gestão de Convites</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span>Alessandro Rodrigues</span>
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold">
                  AR
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Eventos Ativos</p>
                  <p className="text-3xl font-bold">{stats.totalEventos}</p>
                </div>
                <div className="text-3xl opacity-50">📅</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Convites Vendidos</p>
                  <p className="text-3xl font-bold">{stats.totalConvites}</p>
                </div>
                <div className="text-3xl opacity-50">🎫</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Faturamento Total</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.receitaTotal)}</p>
                </div>
                <div className="text-3xl opacity-50">💰</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Taxa Check-in</p>
                  <p className="text-3xl font-bold">{stats.taxaCheckin}%</p>
                </div>
                <div className="text-3xl opacity-50">📊</div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Eventos Ativos</h2>
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                + Novo Evento
              </button>
            </div>

            <div className="space-y-6">
              {eventos.map((evento) => (
                <div key={evento.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{evento.nome}</h3>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <span>📅 {evento.data}</span>
                        <span>📍 {evento.local}</span>
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-lg font-semibold text-blue-900">{evento.vendidos}</div>
                      <div className="text-xs text-gray-600">Vendidos</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-lg font-semibold text-blue-900">{evento.disponivel}</div>
                      <div className="text-xs text-gray-600">Disponíveis</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-lg font-semibold text-blue-900">{formatCurrency(evento.arrecadado)}</div>
                      <div className="text-xs text-gray-600">Arrecadado</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-lg font-semibold text-blue-900">{evento.ocupacao}%</div>
                      <div className="text-xs text-gray-600">Ocupação</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progresso de Vendas</span>
                      <span>{evento.ocupacao}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-900 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${evento.ocupacao}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="text-blue-900 hover:text-blue-700 text-sm font-medium">
                      Ver Detalhes
                    </button>
                    <button className="text-blue-900 hover:text-blue-700 text-sm font-medium">
                      Gerar Convites
                    </button>
                    <button className="text-blue-900 hover:text-blue-700 text-sm font-medium">
                      Relatórios
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

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
    </>
  )
}
