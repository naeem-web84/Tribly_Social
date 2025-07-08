import React from 'react';

const CustomButton = ({
  children,
  type = 'button',
  onClick,
  className = '',
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn px-4 py-2 rounded-md font-semibold text-white ${className}`}
      style={{
        backgroundColor: 'var(--color-button)',      // Steel Blue or Orange
        color: 'var(--color-button-text)',           // Always White
        border: 'none',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
