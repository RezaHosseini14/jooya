import { Form, TagPicker } from "rsuite";

export type DataType = {
  label: string;
  value: any;
};

type SelectFieldType = {
  name: string;
  className?: string;
  title: string;
  data: DataType[];
  value?: any;
  onChange?: (value: string) => void;
  creatable?: boolean;
};

function TagSelectField({ name, className, title, data, onChange, value, creatable }: SelectFieldType) {
  return (
    <Form.Group classPrefix="m-0">
      <Form.ControlLabel className="font-semibold text-base !w-full">{title}</Form.ControlLabel>
      <Form.Control
        onChange={onChange}
        classPrefix="!w-full"
        className={`h-10 text-lg border w-full ${className && className}`}
        name={name}
        autoComplete="off"
        accepter={TagPicker}
        data={data}
        value={value}
        creatable={creatable}
        menuClassName="w-32"
      />
    </Form.Group>
  );
}

export default TagSelectField;
