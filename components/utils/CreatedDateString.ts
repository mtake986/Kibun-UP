
const returnDateString = ( date : Date) => {
  return date.getMonth() + 1 + "/" + date.getDate() + ", " + date.getFullYear();
};

export default returnDateString;
