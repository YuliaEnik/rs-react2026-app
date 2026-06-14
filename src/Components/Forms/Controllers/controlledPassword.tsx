import { useState } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PasswordStrength } from '../../PasswordStreingth/passwordStreigth';

interface ControlledPasswordProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  showStrength?: boolean;
}

export function ControlledPassword<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  showStrength = false,
}: ControlledPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordId = String(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="input-wrapper_password">
          {showStrength && (
            <PasswordStrength passwordValue={field.value || ''} />
          )}
          <label className="form-line password" htmlFor={passwordId}>
            {label}:
            <input
              {...field}
              id={passwordId}
              value={field.value ?? ''}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              className="input"
              style={{ position: 'relative' }}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </label>
          {error && <p className="error">{error.message}</p>}
        </div>
      )}
    />
  );
}
