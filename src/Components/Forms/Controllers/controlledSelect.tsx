import { useState, useEffect } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const autocompleteId = String(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        useEffect(() => {
          setInputValue(value || '');
        }, [value]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;
          setInputValue(val);
          onChange(val);
          setIsOpen(true);
          setFiltered(
            val
              ? options.filter((o) =>
                  o.toLowerCase().includes(val.toLowerCase())
                )
              : []
          );
        };

        const handleSelect = (option: string) => {
          setInputValue(option);
          onChange(option);
          setIsOpen(false);
        };

        return (
          <div className="input-wrapper">
            <label className="form-line" htmlFor={autocompleteId}>
              {label}:
              <input
                id={autocompleteId}
                type="text"
                placeholder={`Enter your ${label.toLowerCase()}...`}
                className="input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                autoComplete="off"
              />
              {isOpen && filtered.length > 0 && (
                <ul className="autocomplete-list">
                  {filtered.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(item)}
                      className="autocomplete-item"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </label>
            {error ? <p className="error">{error.message}</p> : <br />}
          </div>
        );
      }}
    />
  );
};

export { ControlledAutocomplete };
