export const shamsi = (date: any, format?: any): string => {
  if (date === null || date === undefined) return "";
  const d = new Date(parseInt(date));
  const year = d.toLocaleDateString("fa", { year: "numeric" });
  const month = d.toLocaleDateString("fa", { month: "2-digit" });
  const day = d.toLocaleDateString("fa", { day: "2-digit" });

  if (format == "YYYY/MM/DD") {
    const shamsiDate = `${year}/${month}/${day}`;
    return shamsiDate;
  } else if (format == "hh:mm:ss") {
    const d = new Date(parseInt(date));
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();
    const time = `${hour}:${minute}:${second}`;
    return time;
  } else {
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const seconds = d.getSeconds().toString().padStart(2, "0");
    const shamsiDate = `${hours}:${minutes}:${seconds} - ${year}/${month}/${day}`;
    return shamsiDate;
  }
};
