import { Form, InputPicker } from "rsuite";

export type DataType = {
  label: string;
  value: any;
};

type SelectFieldType = {
  name: string;
  className?: string;
  title: string;
  data: DataType[];
  disabled?: boolean;
  value?: any;
  onChange?: (value: string) => void;
  virtualized?: boolean;
  cleanable?: boolean;
};

function SelectField({ name, className, title, data, disabled, onChange, value, virtualized, cleanable }: SelectFieldType) {
  return (
    <Form.Group classPrefix="m-0">
      <Form.ControlLabel className="font-semibold text-base !w-full">{title}</Form.ControlLabel>
      <Form.Control
        onChange={onChange}
        classPrefix="!w-full"
        className={`h-10 text-lg border w-full ${className && className}`}
        name={name}
        autoComplete="off"
        accepter={InputPicker}
        data={data}
        disabled={disabled}
        value={value}
        virtualized={virtualized}
        cleanable={cleanable}
      />
    </Form.Group>
  );
}

export default SelectField;
