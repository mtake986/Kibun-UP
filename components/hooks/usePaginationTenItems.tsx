
export const usePaginationTenItems = (currentPage: number, lis: Array<any>) => {
  // User is currently on this page
  // const [currentPage, setCurrentPage] = useState(1);
  // Number of Records to be displayed on each page

  let RECORDS_PER_PAGE = 10;

  const indexOfLastRecord = currentPage * RECORDS_PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE;

  // Records to be displayed on the current page
  const currentRecords = lis.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(lis.length / RECORDS_PER_PAGE);

  return { nPages, currentRecords };
};

export default usePaginationTenItems;
