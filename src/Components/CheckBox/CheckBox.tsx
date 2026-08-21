import type { ICheckbox } from "../../types/types";
import "./CheckBox.scss";

const Checkbox: React.FC<ICheckbox> = (props: ICheckbox) => {
  const idCheckbox = String(props.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="checkbox" data-testid="checkbox">
      <input
        type="checkbox"
        id={idCheckbox}
        checked={props.checked || false}
        onChange={handleChange}
      />
      <label htmlFor={idCheckbox}></label>
    </div>
  );
};

export { Checkbox };
