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

const ControlledGender = <T extends FieldValues>({
  name,
  control,
}: Omit<FieldProps<T>, 'label'>) => {
  const baseName = String(name);
  const maleInputId = `${baseName}-male`;
  const femaleInputId = `${baseName}-female`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="input-wrapper">
          <label className="form-line" htmlFor={maleInputId}>
            Male
            <input
              id={maleInputId}
              type="radio"
              name={baseName}
              value="male"
              checked={value === 'male'}
              onChange={() => onChange('male')}
            />
          </label>
          <label className="form-line" htmlFor={femaleInputId}>
            Female
            <input
              id={femaleInputId}
              type="radio"
              name={baseName}
              value="female"
              checked={value === 'female'}
              onChange={() => onChange('female')}
            />
          </label>
          {error ? <p className="error">{error.message}</p> : <br />}
        </div>
      )}
    />
  );
};

export { ControlledGender };
