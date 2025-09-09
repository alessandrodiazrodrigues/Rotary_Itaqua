// components/layout/Layout.jsx
import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children, title = "Sistema de Convites", showNavigation = true, user = null }) => {
  return (
    <>
      <Head>
        <title>{title} - Rotary Club Itaquaquecetuba</title>
        <meta name="description" content="Sistema de Gestão de Convites - Rotary Club Itaquaquecetuba" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          rel="stylesheet" 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        {showNavigation && <Navigation />}
        
        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;

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

// components/layout/Navigation.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Navigation = ({ activeTab, onTabChange }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ROTARY_COLORS = {
    primary: '#17458f',
    secondary: '#f7a81b',
    surface: '#f8f9fa',
    border: '#dee2e6'
  };

  const tabs = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard', route: '/dashboard' },
    { id: 'events', icon: 'fas fa-calendar-alt', label: 'Eventos', route: '/dashboard?tab=events' },
    { id: 'invites', icon: 'fas fa-ticket-alt', label: 'Convites', route: '/dashboard?tab=invites' },
    { id: 'sales', icon: 'fas fa-chart-line', label: 'Vendas', route: '/dashboard?tab=sales' },
    { id: 'members', icon: 'fas fa-users', label: 'Companheiros', route: '/dashboard?tab=members' },
    { id: 'reports', icon: 'fas fa-file-alt', label: 'Relatórios', route: '/dashboard?tab=reports' }
  ];

  const currentTab = activeTab || router.query.tab || 'dashboard';

  const handleTabClick = (tab) => {
    if (onTabChange) {
      onTabChange(tab.id);
    } else {
      router.push(tab.route);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav style={{ backgroundColor: ROTARY_COLORS.surface, borderBottom: `2px solid ${ROTARY_COLORS.border}` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center gap-2 border-b-3 transition-all duration-300 ${
                currentTab === tab.id
                  ? 'text-blue-900'
                  : 'border-transparent text-gray-600 hover:text-blue-900 hover:bg-blue-50'
              }`}
              style={{
                borderBottomColor: currentTab === tab.id ? ROTARY_COLORS.secondary : 'transparent',
                backgroundColor: currentTab === tab.id ? 'rgba(23, 69, 143, 0.05)' : 'transparent'
              }}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 font-medium"
          >
            <div className="flex items-center gap-2">
              <i className={tabs.find(t => t.id === currentTab)?.icon || 'fas fa-bars'}></i>
              {tabs.find(t => t.id === currentTab)?.label || 'Menu'}
            </div>
            <i className={`fas fa-chevron-${mobileMenuOpen ? 'up' : 'down'}`}></i>
          </button>

          {mobileMenuOpen && (
            <div className="border-t border-gray-200 bg-white">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                    currentTab === tab.id
                      ? 'bg-blue-50 text-blue-900 border-r-4'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={{
                    borderRightColor: currentTab === tab.id ? ROTARY_COLORS.secondary : 'transparent'
                  }}
                >
                  <i className={tab.icon}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

// components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info do Clube */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Rotary Club Itaquaquecetuba
            </h3>
            <p className="text-gray-300 text-sm mb-2">Distrito 4563</p>
            <p className="text-gray-300 text-sm mb-2">
              Sistema de Gestão de Convites
            </p>
            <p className="text-gray-300 text-sm">
              "Servir é a renda que pagamos pelo espaço que ocupamos na Terra"
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Links Úteis
            </h3>
            <div className="space-y-2">
              <a 
                href="https://rotary.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white text-sm transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Rotary International
              </a>
              <a 
                href="https://rotary.org.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white text-sm transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Rotary Brasil
              </a>
              <a 
                href="https://brandcenter.rotary.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white text-sm transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Brand Center
              </a>
            </div>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Suporte Técnico
            </h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">
                <i className="fas fa-envelope mr-2"></i>
                cvcalessandro@gmail.com
              </p>
              <p className="text-gray-300 text-sm">
                <i className="fas fa-phone mr-2"></i>
                Suporte durante eventos
              </p>
              <p className="text-gray-300 text-sm">
                <i className="fas fa-clock mr-2"></i>
                Sistema 24/7 online
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-600 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Rotary Club Itaquaquecetuba. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Versão 1.0.0</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-400 text-sm">Sistema Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
