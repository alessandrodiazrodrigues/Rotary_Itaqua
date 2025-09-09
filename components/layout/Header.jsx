// components/layout/Header.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Header = ({ user }) => {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const ROTARY_COLORS = {
    primary: '#17458f',
    secondary: '#f7a81b',
    blueMono: '#0067c8'
  };

  const handleLogout = () => {
    localStorage.removeItem('rotary_user');
    router.push('/login');
  };

  const getUserInitials = (name) => {
    if (!name) return 'RC';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isAdmin = user?.email === 'cvcalessandro@gmail.com';

  return (
    <header 
      className="sticky top-0 z-50 shadow-lg"
      style={{ 
        background: `linear-gradient(135deg, ${ROTARY_COLORS.primary} 0%, ${ROTARY_COLORS.blueMono} 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo e Info do Clube */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <div 
              className="w-12 h-12 sm:w-15 sm:h-15 rounded-full flex items-center justify-center text-xs font-bold text-center leading-tight"
              style={{ 
                backgroundColor: '#ffffff',
                color: ROTARY_COLORS.primary,
                width: '60px',
                height: '60px'
              }}
            >
              ROTARY<br/>ITAQUÁ<br/>4563
            </div>
            <div className="text-white">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                Rotary Club Itaquaquecetuba
              </h1>
              <p className="text-xs sm:text-sm opacity-90 hidden sm:block">
                Distrito 4563 • Sistema de Gestão de Convites
              </p>
            </div>
          </div>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg p-2 transition-all"
              >
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium">{user.nome || user.email}</div>
                  <div className="text-xs opacity-75">
                    {isAdmin ? 'Administrador' : 'Companheiro'}
                  </div>
                </div>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ backgroundColor: ROTARY_COLORS.secondary }}
                >
                  {getUserInitials(user.nome || user.email)}
                </div>
                <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'} text-xs`}></i>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">
                      {user.nome || user.email}
                    </div>
                    <div className="text-xs text-gray-500">
                      {isAdmin ? 'Administrador' : 'Companheiro Rotary'}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => router.push('/perfil')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <i className="fas fa-user text-gray-400"></i>
                    Meu Perfil
                  </button>
                  
                  {isAdmin && (
                    <button
                      onClick={() => router.push('/configuracoes')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <i className="fas fa-cog text-gray-400"></i>
                      Configurações
                    </button>
                  )}
                  
                  <hr className="my-1" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <i className="fas fa-sign-out-alt text-red-400"></i>
                    Sair do Sistema
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Login Button (se não logado) */}
          {!user && (
            <button
              onClick={() => router.push('/login')}
              className="bg-white text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
