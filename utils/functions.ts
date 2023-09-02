import { auth } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function getRandomNum(max: number) {
  return Math.floor(Math.random() * max);
}

export function pagination(currentPage: number, lis: Array<any>) {
  // User is currently on this page
  // const [currentPage, setCurrentPage] = useState(1);
  // Number of Records to be displayed on each page

  const { loginUser } = useAuth();
  const [user] = useAuthState(auth);

  let RECORDS_PER_PAGE = 5;
  if (loginUser) {
    RECORDS_PER_PAGE = loginUser.paginationNum;
  }

  const indexOfLastRecord = currentPage * RECORDS_PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE;

  // Records to be displayed on the current page
  const currentRecords = lis.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(lis.length / RECORDS_PER_PAGE);

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
