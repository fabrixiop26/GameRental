export const maxDate =
  (maxValue: Date, message = "Max Date exceeded") =>
  (value: string) => {
    if (new Date(value) <= maxValue) {
      return undefined;
    }
    return message;
  };

export const minDate =
  (minValue: Date, message = "Max Date exceeded") =>
  (value: string) => {
    if (new Date(value) >= minValue) {
      return undefined;
    }
    return message;
  };

export const getToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};
