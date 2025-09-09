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
