import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface ControlledInputProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}
const ControlledInput = <T extends FieldValues>({
  name,
  control,
  label,
  className = '',
  ...props
}: ControlledInputProps<T>) => {
  const inputId = String(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="input-wrapper">
          <label className="form-line" htmlFor={inputId}>
            {label}:
            <input
              {...field}
              {...props}
              id={inputId}
              className={`input ${className}`}
              value={field.value ?? ''}
            />
          </label>
          {error ? <p className="error">{error.message}</p> : <br />}
        </div>
      )}
    />
  );
};

export { ControlledInput };
