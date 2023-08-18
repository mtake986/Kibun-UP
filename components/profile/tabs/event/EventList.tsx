"use client";
import React, { Suspense, useEffect, useState } from "react";
import { app, auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EventCard from "./EventCard";
import { useEvent } from "@/context/EventContext";
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";

const EventList = () => {
  const [user] = useAuthState(auth);

  const { loginUserEvents, getLoginUserEvents } = useEvent();
  useEffect(() => {
    getLoginUserEvents();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, loginUserEvents);

  return (
    <div>
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc) => (
            <EventCard key={doc.id} event={doc} />
          ))}
          {nPages >= 2 && (
            <PaginationBtns
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <NoFetchedData text="No events found" />
      )}
    </div>
  );
};

export default EventList;
