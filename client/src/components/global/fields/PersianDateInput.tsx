import { useState, ChangeEvent } from "react";

const PersianDateInput = () => {
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4) + "/" + value.slice(4);
      const year = value.slice(0, 4);
      if (parseInt(year) < 1300 || year.length !== 4) {
        setError("سال باید چهار رقمی و بزرگتر از 1300 باشد");
        return;
      }
    }
    if (value.length > 7) {
      value = value.slice(0, 7) + "/" + value.slice(7);
      const month = value.slice(5, 7);
      if (parseInt(month) < 1 || parseInt(month) > 12 || month.length !== 2) {
        setError("ماه باید بین 01 تا 12 باشد و دقیقا دو رقمی باشد");
        return;
      }
    }
    if (value.length <= 10) {
      setDate(value);
      setError("");
    }
  };

  const handleBlur = () => {
    const dateParts = date.split("/");

    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;

      if (parseInt(year) < 1300 || year.length !== 4) {
        setError("سال باید چهار رقمی و بزرگتر از 1300 باشد");
        return;
      }

      if (parseInt(month) < 1 || parseInt(month) > 12 || month.length !== 2) {
        setError("ماه باید بین 01 تا 12 باشد و دقیقا دو رقمی باشد");
        return;
      }

      if (parseInt(day) < 1 || parseInt(day) > 31 || day.length !== 2) {
        setError("روز باید بین 01 تا 31 باشد و دقیقا دو رقمی باشد");
        return;
      }

      // اگر همه چیز درست بود
      setError("");
    } else {
      setError("فرمت تاریخ باید به صورت روز/ماه/سال باشد");
    }
  };

  return (
    <div className="relative">
      <input type="text" value={date} onChange={handleChange} onBlur={handleBlur} placeholder="روز/ماه/سال" maxLength={10} className={`rs-input h-10 text-lg border border-spGreen w-full p-2 ${error && "input-error"}`} />
      {error && (
        <span className="rs-form-error-message rs-form-error-message-show">
          <span className="rs-form-error-message-arrow"></span>
          <span className="rs-form-error-message-inner">{error}</span>
        </span>
      )}
    </div>
  );
};

export default PersianDateInput;
