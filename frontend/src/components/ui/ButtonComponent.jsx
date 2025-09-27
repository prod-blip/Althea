import React from 'react';

const ButtonComponent = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg focus:ring-blue-500',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-lg focus:ring-green-500',
    white: 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg focus:ring-blue-500',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-blue-600 focus:ring-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default ButtonComponent;