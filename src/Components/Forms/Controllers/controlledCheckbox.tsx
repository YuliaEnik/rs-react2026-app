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

const ControlledCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
}: FieldProps<T>) => {
  const checkboxId = String(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="input-wrapper">
          <label className="form-line" htmlFor={checkboxId}>
            {label}:
            <input
              id={checkboxId}
              type="checkbox"
              {...field}
              checked={!!field.value}
            />
          </label>
          {error ? <p className="error">{error.message}</p> : <br />}
        </div>
      )}
    />
  );
};

export { ControlledCheckbox };
