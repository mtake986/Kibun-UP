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

export const changeTagColor = (tagColor: string) => {
    if (tagColor === "red")
      return "bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500";
    else if (tagColor === "orange")
      return "bg-orange-50 text-orange-500 hover:bg-orange-50 hover:text-orange-500";
    else if (tagColor === "green")
      return "bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500";
    else if (tagColor === "blue")
      return "bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500";
    else if (tagColor === "purple")
      return "bg-purple-50 text-purple-500 hover:bg-purple-50 hover:text-purple-500";
    else return "bg-white text-black hover:bg-white hover:text-black";
  };