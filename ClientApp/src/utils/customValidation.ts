export const maxDate =
  (maxValue: Date, message = "Max Date exceeded") =>
  (value: Date) => {
    if (value <= maxValue) {
      return undefined;
    }
    return message;
  };

export const minDate =
  (minValue: Date, message = "Max Date exceeded") =>
  (value: Date) => {
    if (value >= minValue) {
      return undefined;
    }
    return message;
  };

export const getToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};
