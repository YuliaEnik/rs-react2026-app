import React, { forwardRef, useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const generatedId = useId();
    const inputId = props.id || generatedId;

    return (
      <div className="input-wrapper">
        <label className="form-line" htmlFor={inputId}>
          {label}:
          <input
            id={inputId}
            className={`input ${className}`}
            ref={ref}
            {...props}
          />
        </label>
        {error ? <p className="error">{error}</p> : <br />}
      </div>
    );
  }
);

Input.displayName = 'Input';
