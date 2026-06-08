import { useState } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  useWatch,
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
  const [filterText, setFilterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const autocompleteId = String(name);

  const formValue = useWatch({ control, name }) || '';

  const inputValue = isOpen ? filterText : formValue;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => {
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;
          setFilterText(val);
          onChange(val);
          setIsOpen(true);
        };

        const handleSelect = (option: string) => {
          onChange(option);
          setIsOpen(false);
        };

        const filteredOptions = filterText
          ? options.filter((o) =>
              o.toLowerCase().includes(filterText.toLowerCase())
            )
          : options;

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
                onBlur={() =>
                  setTimeout(() => {
                    setIsOpen(false);
                    setFilterText('');
                  }, 200)
                }
                autoComplete="off"
              />
              {isOpen && filteredOptions.length > 0 && (
                <ul className="autocomplete-list">
                  {filteredOptions.map((item, index) => (
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
