// components/common/Button.jsx
import React from 'react';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  children, 
  icon,
  onClick,
  className = '',
  type = 'button',
  fullWidth = false,
  ...props 
}) => {
  
  const ROTARY_COLORS = {
    primary: '#17458f',
    secondary: '#f7a81b',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  };
  
  const variants = {
    primary: `bg-blue-900 hover:bg-blue-800 text-white border-transparent`,
    secondary: `bg-yellow-500 hover:bg-yellow-600 text-white border-transparent`,
    outline: `bg-transparent hover:bg-blue-900 text-blue-900 hover:text-white border-blue-900 border-2`,
    danger: `bg-red-600 hover:bg-red-700 text-white border-transparent`,
    success: `bg-green-600 hover:bg-green-700 text-white border-transparent`,
    warning: `bg-yellow-500 hover:bg-yellow-600 text-black border-transparent`,
    ghost: `bg-transparent hover:bg-gray-100 text-gray-700 border-transparent`
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg border
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
    ${disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${fullWidth ? 'w-full' : ''}
  `;
  
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          Carregando...
        </>
      ) : (
        <>
          {icon && <i className={icon}></i>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;

// components/common/Modal.jsx
import React, { useEffect } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  className = ''
}) => {
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-90vh overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            )}
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

// components/common/Table.jsx
import React, { useState } from 'react';
import Button from './Button';

const Table = ({ 
  columns, 
  data, 
  loading = false,
  searchable = true,
  pagination = true,
  itemsPerPage = 10,
  onRowClick,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Filtrar dados
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Ordenar dados
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginação
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'fas fa-sort text-gray-400';
    return sortConfig.direction === 'asc' 
      ? 'fas fa-sort-up text-blue-600' 
      : 'fas fa-sort-down text-blue-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
        <span className="ml-2 text-gray-600">Carregando dados...</span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      {/* Search */}
      {searchable && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable !== false && (
                      <i className={getSortIcon(column.key)}></i>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, sortedData.length)} de {sortedData.length} registros
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              icon="fas fa-chevron-left"
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              icon="fas fa-chevron-right"
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

// components/common/Loading.jsx
import React from 'react';

const Loading = ({ 
  size = 'md', 
  text = 'Carregando...', 
  fullScreen = false,
  color = 'blue-900'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-${color} ${sizes[size]}`}
      ></div>
      {text && (
        <p className={`mt-4 text-gray-600 ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return <LoadingSpinner />;
};

export default Loading;

// components/common/Alert.jsx
import React, { useState, useEffect } from 'react';

const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  dismissible = true,
  autoClose = false,
  duration = 5000,
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const types = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'fas fa-check-circle text-green-400'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'fas fa-exclamation-circle text-red-400'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'fas fa-exclamation-triangle text-yellow-400'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'fas fa-info-circle text-blue-400'
    }
  };

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  const alertType = types[type] || types.info;

  return (
    <div className={`${alertType.bg} ${alertType.border} border rounded-lg p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <i className={alertType.icon}></i>
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${alertType.text}`}>
              {title}
            </h3>
          )}
          {message && (
            <div className={`${title ? 'mt-2' : ''} text-sm ${alertType.text}`}>
              {message}
            </div>
          )}
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              onClick={handleClose}
              className={`inline-flex rounded-md p-1.5 ${alertType.text} hover:bg-opacity-20 focus:outline-none`}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
