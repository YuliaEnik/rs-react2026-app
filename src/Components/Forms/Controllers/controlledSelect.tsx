import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
interface AutocompleteProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: string[];
}

const ControlledAutocomplete = <T extends FieldValues>({
  name,
  control,
  label,
  options,
}: AutocompleteProps<T>) => {
  const autocompleteId = String(name);
  const datalistId = `datalist-${autocompleteId}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="input-wrapper">
          <label className="form-line" htmlFor={autocompleteId}>
            {label}:
            <input
              {...field}
              id={autocompleteId}
              type="text"
              placeholder={`Enter your ${label.toLowerCase()}...`}
              className="input"
              value={field.value ?? ''}
              list={datalistId}
              autoComplete="off"
            />
            <datalist id={datalistId}>
              {options.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
          </label>
          {error ? <p className="error">{error.message}</p> : <br />}
        </div>
      )}
    />
  );
};

export { ControlledAutocomplete };
