import React from 'react';
import { CONFIG } from '../../config/settings';

/**
 * Componente Button padronizado seguindo Rotary Brand Guidelines
 * 
 * @param {Object} props
 * @param {string} props.variant - primary, secondary, outline, danger
 * @param {string} props.size - sm, md, lg
 * @param {boolean} props.loading - Estado de carregamento
 * @param {boolean} props.disabled - Botão desabilitado
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {React.ReactNode} props.icon - Ícone (opcional)
 * @param {Function} props.onClick - Função de click
 * @param {string} props.className - Classes CSS adicionais
 */
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
  ...props 
}) => {
  
  // Variantes de cor baseadas no Rotary Brand Guidelines
  const variants = {
    primary: `bg-[${CONFIG.COLORS.primary}] hover:bg-[#0f3a7a] text-white border-transparent`,
    secondary: `bg-[${CONFIG.COLORS.secondary}] hover:bg-[#e6971a] text-white border-transparent`,
    outline: `bg-transparent hover:bg-[${CONFIG.COLORS.primary}] text-[${CONFIG.COLORS.primary}] hover:text-white border-[${CONFIG.COLORS.primary}] border-2`,
    danger: `bg-[${CONFIG.COLORS.danger}] hover:bg-[#c82333] text-white border-transparent`,
    success: `bg-[${CONFIG.COLORS.success}] hover:bg-[#218838] text-white border-transparent`,
    warning: `bg-[${CONFIG.COLORS.warning}] hover:bg-[#e0a800] text-black border-transparent`,
    ghost: `bg-transparent hover:bg-gray-100 text-gray-700 border-transparent`
  };
  
  // Tamanhos
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Classes base
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg border
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${CONFIG.COLORS.primary}]
    disabled:opacity-50 disabled:cursor-not-allowed
    active:transform active:scale-95
  `;
  
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'}
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
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
