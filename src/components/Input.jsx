import React from 'react';
import { clsx } from 'clsx';

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
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          'w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'bg-white dark:bg-gray-700',
          'text-gray-900 dark:text-gray-100',
          'border-gray-300 dark:border-gray-600',
          'placeholder-gray-500 dark:placeholder-gray-400',
          'hover:border-gray-400 dark:hover:border-gray-500',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;