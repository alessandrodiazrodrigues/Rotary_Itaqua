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
