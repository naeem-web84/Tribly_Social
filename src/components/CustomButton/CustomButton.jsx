import React from 'react';

const CustomButton = ({
  children,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${className} ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.filter = 'brightness(0.9)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
