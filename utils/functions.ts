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

export function changeTagColor(tagColor: string) {
  switch (tagColor) {
    case "red":
      return "bg-red-50 text-red-500";
    case "orange":
      return "bg-orange-50 text-orange-500";
    case "green":
      return "bg-green-50 text-green-500";
    case "blue":
      return "bg-blue-50 text-blue-500";
    case "purple":
      return "bg-purple-50 text-purple-500";
    case "pink":
      return "bg-pink-50 text-pink-500";
    default:
      return "bg-gray-50 text-gray-500";
  }
}