// pages/portaria.js - App Scanner QR Code
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { authService } from '../lib/auth';

const PortariaApp = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanMode, setScanMode] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [lastCheckin, setLastCheckin] = useState(null);
  const [todayStats, setTodayStats] = useState({
    total_checkins: 0,
    total_esperado: 0,
    ultimo_checkin: null
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    setUser(authService.getCurrentUser());
    loadTodayStats();
  }, [router]);

  const loadTodayStats = () => {
    setTimeout(() => {
      setTodayStats({
        total_checkins: 156,
        total_esperado: 187,
        ultimo_checkin: {
          codigo: 'F147',
          nome: 'Maria Santos',
          hora: '12:05'
        }
      });
      setLoading(false);
    }, 1000);
  };

  const processarCheckin = async (codigo) => {
    try {
      // Simular validação do QR Code
      const mockValidation = {
        valido: true,
        convite: {
          codigo: codigo,
          evento: 'Costelada Rotary',
          cliente: 'João Silva',
          valor: 100.00,
          tipo: 'Físico',
          companheiro: 'Ana Costa'
        }
      };

      if (mockValidation.valido) {
        const checkinData = {
          ...mockValidation.convite,
          hora_checkin: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        
        setLastCheckin(checkinData);
        setTodayStats(prev => ({
          ...prev,
          total_checkins: prev.total_checkins + 1,
          ultimo_checkin: {
            codigo: checkinData.codigo,
            nome: checkinData.cliente,
            hora: checkinData.hora_checkin
          }
        }));

        // Feedback sonoro e visual
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        
        // Limpar código manual
        setManualCode('');
        
        return { success: true, data: checkinData };
      } else {
        throw new Error('Convite inválido');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleManualCheckin = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    
    const result = await processarCheckin(manualCode.toUpperCase());
    
    if (!result.success) {
      alert(`❌ Erro: ${result.error}`);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <Layout title="Carregando..." user={user}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando portaria...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="App Portaria" user={user} showNavigation={false}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚪 Portaria Digital
          </h1>
          <p className="text-gray-600">Check-in rápido e seguro via QR Code</p>
        </div>

        {/* Stats do Dia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-600 text-white p-6 rounded-xl">
            <div className="text-center">
              <p className="text-3xl font-bold">{todayStats.total_checkins}</p>
              <p className="text-sm opacity-90">Check-ins Realizados</p>
            </div>
          </div>
          
          <div className="bg-blue-600 text-white p-6 rounded-xl">
            <div className="text-center">
              <p className="text-3xl font-bold">{todayStats.total_esperado}</p>
              <p className="text-sm opacity-90">Total Esperado</p>
            </div>
          </div>
          
          <div className="bg-purple-600 text-white p-6 rounded-xl">
            <div className="text-center">
              <p className="text-3xl font-bold">
                {Math.round((todayStats.total_checkins / todayStats.total_esperado) * 100)}%
              </p>
              <p className="text-sm opacity-90">Taxa de Presença</p>
            </div>
          </div>
        </div>

        {/* Check-in Manual */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            ✋ Check-in Manual
          </h3>
          
          <form onSubmit={handleManualCheckin} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                placeholder="Digite o código (ex: F147, D089)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center font-mono text-lg"
                autoFocus
              />
              <Button type="submit" disabled={!manualCode.trim()}>
                <i className="fas fa-check"></i>
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <Button
              variant="secondary"
              onClick={() => setScanMode(!scanMode)}
              icon={scanMode ? "fas fa-keyboard" : "fas fa-qrcode"}
            >
              {scanMode ? 'Voltar ao Manual' : 'Scanner QR Code'}
            </Button>
          </div>
        </div>

        {/* Scanner QR Code */}
        {scanMode && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              📱 Scanner QR Code
            </h3>
            
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <i className="fas fa-camera text-6xl text-gray-400 mb-4"></i>
              <p className="text-gray-600 mb-4">
                Posicione o QR Code do convite na câmera
              </p>
              <Button variant="outline">
                <i className="fas fa-camera mr-2"></i>
                Ativar Câmera
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Funcionalidade disponível apenas em HTTPS
              </p>
            </div>
          </div>
        )}

        {/* Último Check-in */}
        {lastCheckin && (
          <Alert
            type="success"
            title="✅ Check-in Realizado com Sucesso!"
            message={
              <div className="mt-2">
                <p><strong>Código:</strong> {lastCheckin.codigo}</p>
                <p><strong>Cliente:</strong> {lastCheckin.cliente}</p>
                <p><strong>Evento:</strong> {lastCheckin.evento}</p>
                <p><strong>Valor:</strong> {formatCurrency(lastCheckin.valor)}</p>
                <p><strong>Hora:</strong> {lastCheckin.hora_checkin}</p>
              </div>
            }
            dismissible={true}
            onClose={() => setLastCheckin(null)}
            className="mb-8"
          />
        )}

        {/* Últimos Check-ins */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            📝 Últimos Check-ins
          </h3>
          
          <div className="space-y-3">
            {[
              { codigo: 'F147', nome: 'Maria Santos', hora: '12:05', tipo: 'Físico' },
              { codigo: 'D089', nome: 'Pedro Silva', hora: '12:03', tipo: 'Digital' },
              { codigo: 'F203', nome: 'Ana Costa', hora: '12:01', tipo: 'Físico' },
              { codigo: 'D156', nome: 'João Oliveira', hora: '11:58', tipo: 'Digital' },
              { codigo: 'F078', nome: 'Carlos Santos', hora: '11:55', tipo: 'Físico' }
            ].map((checkin, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    checkin.tipo === 'Físico' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {checkin.codigo}
                  </span>
                  <span className="font-medium">{checkin.nome}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <i className="fas fa-clock mr-1"></i>
                  {checkin.hora}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h4 className="font-semibold text-gray-900 mb-2">📊 Relatório de Presença</h4>
            <p className="text-sm text-gray-600 mb-4">Lista completa de check-ins do evento</p>
            <Button variant="outline" fullWidth icon="fas fa-download">
              Baixar Lista
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h4 className="font-semibold text-gray-900 mb-2">🔄 Sincronizar Dados</h4>
            <p className="text-sm text-gray-600 mb-4">Atualizar dados com o servidor</p>
            <Button variant="secondary" fullWidth icon="fas fa-sync">
              Sincronizar
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PortariaApp;
