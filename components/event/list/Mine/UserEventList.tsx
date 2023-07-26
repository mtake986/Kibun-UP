"use client";

import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EventCard from "./EventCard";
import { IEvent } from "@/types/type";
import { useState } from "react";
import PaginationBtns from "../PaginationBtns";

type Props = {
  events: IEvent[];
};

const UserEventList = ({ events }: Props) => {
  const [user] = useAuthState(auth);

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // Number of Records to be displayed on each page
  const RECORDS_PER_PAGE = 2;
  const [recordsPerPage] = useState(RECORDS_PER_PAGE);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = events.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(events.length / recordsPerPage);

  return (
    <div>
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc, i) => (
            <EventCard key={doc.id} event={doc} i={i} />
          ))}
          <PaginationBtns
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div className="mt-10">
          <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
            You have no events
          </h2>
        </div>
      )}
    </div>
  );
};

export default UserEventList;
