import { useState } from "react";

export function getRandomNum(max: number) {
  return Math.floor(Math.random() * max);
}

export function pagination(currentPage: number, lis: Array<any>) {
  // User is currently on this page
  // const [currentPage, setCurrentPage] = useState(1);
  // Number of Records to be displayed on each page
  const RECORDS_PER_PAGE = 3;
  const [recordsPerPage] = useState(RECORDS_PER_PAGE);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = lis.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(lis.length / recordsPerPage);

  return { nPages, currentRecords };
}
