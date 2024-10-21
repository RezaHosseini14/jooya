import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type DateFieldType = {
  name: string;
  className?: string;
  title: string;
  value?: any;
  onChange?: (date: any) => void;
  onClear?: () => void;
};

function DateField({ title, value, onChange, onClear }: DateFieldType) {
  console.log(value);

  return (
    <div className="flex flex-col">
      <label className="font-semibold text-base">{title}</label>
      <div className="relative flex">
        <DatePicker
          range
          rangeHover
          style={{ height: "2.5rem", width: "100%" }}
          calendar={persian}
          locale={persian_fa}
          value={value}
          onChange={onChange}
          placeholder={title}
          dateSeparator=" تا "
        />
        {value.some((item) => item) && (
          <i
            className="ki-outline ki-cross text-xl absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400 hover:text-red-500 transition-all cursor-pointer z-50 grid place-content-center"
            onClick={onClear}
          ></i>
        )}
      </div>
    </div>
  );
}

export default DateField;
