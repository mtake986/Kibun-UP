import React, { useState } from "react";
import { IEvent } from "@/types/type";
import PaginationComp from "./PaginationComp";

type Props = {
  events: IEvent[];
};
const Pagination = ({ events }: Props) => {
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // Number of Records to be displayed on each page
  const [recordsPerPage] = useState(2);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = events.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(events.length / recordsPerPage);

  return (
    <PaginationComp
      nPages={nPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default Pagination;
