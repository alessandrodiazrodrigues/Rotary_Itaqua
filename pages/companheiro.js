// pages/companheiro.js - App Simplificado para Companheiros
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import { authService } from '../lib/auth';

const CompanheiroApp = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [minhasVendas, setMinhasVendas] = useState([]);
  const [linkGerado, setLinkGerado] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    const currentUser = authService.getCurrentUser();
    if (currentUser?.nivel_acesso === 'admin') {
      router.push('/dashboard');
      return;
    }
    
    setUser(currentUser);
    loadMinhasVendas();
  }, [router]);

  const loadMinhasVendas = () => {
    setTimeout(() => {
      const mockVendas = [
        {
          id: 'D089',
          evento: 'Costelada Rotary',
          cliente: 'Pedro Oliveira',
          valor: 100.00,
          data_venda: '2024-11-18T14:20:00',
          status: 'pago',
          checkin: null
        },
        {
          id: 'F125',
          evento: 'Costelada Rotary', 
          cliente: 'Ana Silva',
          valor: 50.00,
          data_venda: '2024-11-19T09:15:00',
          status: 'pago',
          checkin: '12:05'
        }
      ];
      setMinhasVendas(mockVendas);
      setLoading(false);
    }, 1000);
  };

  const gerarLink = () => {
    const codigoUnico = `COMP_${Date.now()}`;
    const link = `${window.location.origin}/convite/${codigoUnico}`;
    setLinkGerado(link);
    setShowLinkModal(true);
  };

  const compartilharWhatsApp = () => {
    const mensagem = `🎪 Convite para Costelada Rotary!\n\n📅 15/12/2024 - 12h00\n📍 Roda d'Água\n💰 A partir de R$ 50,00\n\n🔗 Garante já o seu: ${linkGerado}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

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

  if (loading) {
    return (
      <Layout title="Carregando..." user={user}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando seus dados...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const totalVendas = minhasVendas.length;
  const totalArrecadado = minhasVendas.reduce((sum, venda) => sum + venda.valor, 0);
  const totalComissao = totalArrecadado * 0.05; // 5% de comissão

  return (
    <Layout title="App Companheiro" user={user} showNavigation={false}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Olá, {user?.nome || 'Companheiro'}! 👋
          </h1>
          <p className="text-gray-600">Acompanhe suas vendas e gere novos convites</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{totalVendas}</p>
                <p className="text-sm opacity-90">Convites Vendidos</p>
              </div>
              <i className="fas fa-ticket-alt text-2xl opacity-80"></i>
            </div>
          </div>
          
          <div className="bg-green-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalArrecadado)}</p>
                <p className="text-sm opacity-90">Total Arrecadado</p>
              </div>
              <i className="fas fa-coins text-2xl opacity-80"></i>
            </div>
          </div>
          
          <div className="bg-yellow-600 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalComissao)}</p>
                <p className="text-sm opacity-90">Sua Comissão (5%)</p>
              </div>
              <i className="fas fa-percentage text-2xl opacity-80"></i>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎫 Gerar Novo Convite</h3>
            <p className="text-gray-600 mb-4">
              Crie um link personalizado para compartilhar e vender convites digitais
            </p>
            <Button onClick={gerarLink} fullWidth icon="fas fa-link">
              Gerar Link de Venda
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Relatório de Vendas</h3>
            <p className="text-gray-600 mb-4">
              Baixe o relatório completo das suas vendas e comissões
            </p>
            <Button variant="secondary" fullWidth icon="fas fa-download">
              Baixar Relatório
            </Button>
          </div>
        </div>

        {/* Minhas Vendas */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💼 Minhas Vendas</h3>
          
          <Table
            columns={[
              { key: 'id', label: 'Código', render: (value) => (
                <span className="font-mono font-bold">{value}</span>
              )},
              { key: 'evento', label: 'Evento' },
              { key: 'cliente', label: 'Cliente' },
              { key: 'valor', label: 'Valor', render: (value) => formatCurrency(value) },
              { key: 'data_venda', label: 'Data da Venda', render: (value) => formatDate(value) },
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
                  <span className="text-gray-400">Pendente</span>
                )
              )}
            ]}
            data={minhasVendas}
            searchable={true}
            pagination={true}
          />
        </div>

        {/* Modal de Link Gerado */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-link text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Link de Venda Gerado!</h3>
                <p className="text-gray-600">Compartilhe este link para vender convites</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={linkGerado}
                    readOnly
                    className="flex-1 bg-transparent text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(linkGerado);
                      alert('Link copiado!');
                    }}
                    icon="fas fa-copy"
                  >
                    Copiar
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1"
                >
                  Fechar
                </Button>
                <Button
                  variant="secondary"
                  onClick={compartilharWhatsApp}
                  className="flex-1"
                  icon="fab fa-whatsapp"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompanheiroApp;
