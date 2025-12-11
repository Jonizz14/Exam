import React from 'react';
import { clsx } from 'clsx';
import './Input.css';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  error, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          'input-field',
          error && 'input-error',
          className
        )}
        {...props}
      />
      {error && (
        <p className="input-error-text">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;