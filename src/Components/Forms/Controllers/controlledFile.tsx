import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface FieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

const ControlledFile = <T extends FieldValues>({
  name,
  control,
  label,
}: FieldProps<T>) => {
  const fileInputId = String(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, ref }, fieldState: { error } }) => (
        <div className="input-wrapper">
          <label className="form-line" htmlFor={fileInputId}>
            {label}:
            <input
              type="file"
              id={fileInputId}
              accept="image/png, image/jpeg"
              onBlur={onBlur}
              ref={ref}
              onChange={(e) => onChange(e.target.files)}
            />
          </label>
          {error ? <p className="error">{error.message}</p> : <br />}
        </div>
      )}
    />
  );
};

export { ControlledFile };
