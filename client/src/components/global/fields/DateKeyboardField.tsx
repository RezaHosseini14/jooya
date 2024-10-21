import { DateInput, Form } from "rsuite";

type TextFieldType = {
  name: string;
  className?: string;
  title: string;
  type?: string;
  value?: any | undefined;
  onChange?: (value: any) => void;
};

function DateKeyboardField({ name, className, title, type = "text", value, onChange }: TextFieldType) {
  function countDigits(num: number) {
    let count = 0;
    while (num > 0) {
      num = Math.floor(num / 10);
      count++;
    }
    return count;
  }

  // const datePattern = /^(1[3-9][0-9]{2}|20[0-9]{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

  // function validateDate(date: any) {
  //   // بررسی ساختار تاریخ با استفاده از ریجکس
  //   const match = date.match(datePattern);
  //   if (!match) return false;

  //   const year = parseInt(match[1], 10);

  //   // بررسی اعتبار سال
  //   if (year <= 1300) return false;

  //   // تاریخ معتبر است
  //   return true;
  // }

  const handleChange = (e: any) => {
    let value = e.target.value;
    // console.log(validateDate(value));

    if (typeof value === "string") {
      let year: number | undefined = parseInt(value.split("/")[0]);
      let month = value.split("/")[1];
      let day = value.split("/")[2];

      if (countDigits(year) == 4) {
        if (year >= 1300) {
          if (month !== "MM" && month !== "MM") {
            console.log(`${year}/${month}/${day}`);
            return `${year}/${month}/${day}`;
          }
        }
      }
    } else return;
  };

  return (
    <Form.Group>
      <Form.ControlLabel className="font-semibold text-base text-spGreen">{title}</Form.ControlLabel>
      <Form.Control
        className={`h-10 text-lg border border-spGreen w-full text-left ${className || ""}`}
        name={name}
        type={type}
        accepter={DateInput}
        dir="ltr"
        format="yyyy/MM/dd"
        placeholder="----/--/--"
        value={value}
        onChange={(v, e) => {
          if (onChange) {
            const year = handleChange(e);
            onChange(year);
          }
        }}
      />
    </Form.Group>
  );
}

export default DateKeyboardField;
