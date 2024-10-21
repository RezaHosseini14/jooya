export const getFileSize = (input: number | string) => {
  let output = "";
  if (typeof input !== "undefined") {
    let level = 0;
    let parsedInput = typeof input === "string" ? parseFloat(input) : input;
    while (parsedInput > 1000) {
      parsedInput /= 1000;
      level++;
    }
    switch (level) {
      case 0:
        output = `${parsedInput.toFixed(2)} B`;
        break;
      case 1:
        output = `${parsedInput.toFixed(2)} KB`;
        break;
      case 2:
        output = `${parsedInput.toFixed(2)} MB`;
        break;
      case 3:
        output = `${parsedInput.toFixed(2)} TB`;
        break;
      case 4:
        output = `${parsedInput.toFixed(2)} PB`;
        break;
      case 5:
        output = `${parsedInput.toFixed(2)} HB`;
        break;
      default:
        output = `${parsedInput.toFixed(2)} B`;
        break;
    }
  }
  return output;
};
