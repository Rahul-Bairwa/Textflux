import React from 'react';

const Tooltip = ({ 
  message, 
  isVisible, 
  position = 'top', 
  children, 
  className = '' 
}) => {
  if (!isVisible) return children;

  const positionClasses = {
    top: 'absolute -top-12 left-1/2 transform -translate-x-1/2',
    bottom: 'absolute -bottom-12 left-1/2 transform -translate-x-1/2',
    left: 'absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full -ml-2',
    right: 'absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full ml-2'
  };

  const arrowClasses = {
    top: 'absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500',
    bottom: 'absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-green-500',
    left: 'absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-green-500',
    right: 'absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-green-500'
  };

  return (
    <div className={`relative ${className}`}>
      {children}
      <div className={`${positionClasses[position]} bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg z-10 whitespace-nowrap`}>
        {message}
        <div className={arrowClasses[position]}></div>
      </div>
    </div>
  );
};

export default Tooltip; 