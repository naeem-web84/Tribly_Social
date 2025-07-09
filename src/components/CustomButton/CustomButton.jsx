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
      className={`btn px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${className}`}
      style={{
        backgroundColor: 'var(--color-button)',      // From theme
        color: 'var(--color-button-text)',           // From theme
        border: 'none',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
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
