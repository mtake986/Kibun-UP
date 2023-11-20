"use client";
import React, { Suspense, useEffect, useState } from "react";
import { app, auth, db } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEvent } from "@/context/EventContext";
import usePagination from "@/components/hooks/usePagination";

import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import EventCard from "@/components/eventCard/EventCard";

const EventList = () => {
  const [user] = useAuthState(auth);

  const { loginUserEvents, getLoginUserEvents } = useEvent();
  useEffect(() => {
    getLoginUserEvents();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(
    currentPage,
    loginUserEvents
  );

  return (
    <div className="mb-20">
      {currentRecords && currentRecords.length >= 1 ? (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc) => (
            <EventCard event={doc} key={doc.id} />
          ))}
          {nPages >= 2 && (
            <PaginationBtns
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <NoFetchedData text="No events found" />
      )}
    </div>
  );
};

export default EventList;
