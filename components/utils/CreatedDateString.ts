

export const returnDateString = (date: Date) => {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };


export default returnDateString;
