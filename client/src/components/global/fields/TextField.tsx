import { Form } from "rsuite";

type TextFieldType = {
  name: string;
  className?: string;
  classPrefix?: string;
  title: string;
  type?: string;
  value?: any | undefined;
  onChange?: (value: string) => void;
};

function TextField({ name, className, classPrefix, title, type = "text", value, onChange }: TextFieldType) {
  return (
    <Form.Group className={classPrefix} classPrefix="m-0">
      <Form.ControlLabel className="font-semibold text-base">{title}</Form.ControlLabel>
      <Form.Control
        className={`h-10 text-lg border !w-full ${className || ""}`}
        name={name}
        type={type}
        value={value}
        onChange={(v) => {
          if (onChange) {
            onChange(v);
          }
        }}
      />
    </Form.Group>
  );
}

export default TextField;
