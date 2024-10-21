import { Form } from "rsuite";

import DateKeyboardField from "./DateKeyboardField";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
type DateMultipleType = {
  title: string;
  fromName: string;
  toName: string;
  changeFrom?: (value: string) => void;
  changeTo?: (value: string) => void;
};

function DateMultiple({ title, fromName, toName, changeFrom, changeTo }: DateMultipleType) {
  const { t }: { t: TFunction } = useTranslation();
  return (
    <Form.Group>
      <Form.ControlLabel className="font-semibold text-base text-spGreen">{title}</Form.ControlLabel>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-base" htmlFor={fromName}>
            {t("from")}
          </label>
          <DateKeyboardField title="" name={fromName} onChange={changeFrom} />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-base" htmlFor={toName}>
            {t("to")}
          </label>
          <DateKeyboardField title="" name={toName} onChange={changeTo} />
        </div>
      </div>
    </Form.Group>
  );
}

export default DateMultiple;
