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
