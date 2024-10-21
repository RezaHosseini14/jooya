import { forwardRef, Ref } from "react";
import { Form, Input, InputProps } from "rsuite";

type TextAreaFieldType = {
  name: string;
  className?: string;
  classPrefix?: string;
  title: string;
  rows?: number;
  value?: any | undefined;
};

const Textarea = forwardRef(({ rows, ...props }: InputProps & { rows?: number }, ref: Ref<HTMLTextAreaElement>) => <Input {...props} as="textarea" ref={ref} rows={rows} />);

function TexAreaField({ name, className, classPrefix, title, rows, value }: TextAreaFieldType) {
  return (
    <Form.Group className={classPrefix}>
      <Form.ControlLabel className="font-semibold text-base text-spGreen">{title}</Form.ControlLabel>

      <Form.Control className={`h-10 text-lg border border-spGreen w-full ${className}`} value={value} name={name} accepter={Textarea} rows={rows} />
    </Form.Group>
  );
}

export default TexAreaField;
