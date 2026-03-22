'use client';
import { useState } from 'react';
import './Input.scss';

export default function Input({
  label,
  type = 'text',
  error,
  required = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-container">
        <input
          type={inputType}
          className={`input-field ${error ? 'input-error' : ''}`}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}