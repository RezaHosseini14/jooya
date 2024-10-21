import { Form, TagInput } from "rsuite";
import { TriggerType } from "rsuite/esm/InputPicker/InputPickerContext";

//type

type TagFieldType = {
  name: string;
  className?: string;
  classPrefix?: string;
  title: string;
  value?: any | undefined;
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  trigger?: TriggerType | TriggerType[];
};

function TagField({ name, className, title, disabled, value, onChange, trigger }: TagFieldType) {
  return (
    <Form.Group className="w-full relative !mb-0">
      <Form.ControlLabel className="font-semibold text-base">{title}</Form.ControlLabel>

      <TagInput
        className={`h-10 text-lg border w-full ${className ? className : ""}`}
        name={name}
        creatable
        // disabled={disabled}
        // menuStyle={{ width: "300px" }}
        value={value}
        onChange={(v: any) => {
          if (onChange) {
            onChange(v);
          }
        }}
        trigger={trigger}
      />
    </Form.Group>
  );
}

export default TagField;
