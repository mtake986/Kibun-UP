"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useEvent } from "@/context/EventContext";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import EventCard from "@/components/eventCard/EventCard";
import usePagination from "@/components/hooks/usePagination";

const EventList = () => {

  const { profileUserEvents } = useEvent();

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(
    currentPage,
    profileUserEvents
  );
  
  const goPrevAsNoCurrentRecords = () => {
    if (
      currentPage === nPages &&
      currentRecords.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const displayCards = () => {
    if (currentRecords && currentRecords.length >= 1) {
      return (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc, i) => (
            <EventCard
              event={doc}
              key={doc.id}
              goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
            />
          ))}
        </div>
      );
    } else {
      return <NoFetchedData text="No events found" />;
    }
  };

  return (
    <div className="mb-20">
      <div className="my-1 flex flex-col text-xs gap-3 text-gray-400">
        {profileUserEvents.length} events found
      </div>
      {displayCards()}
      <div className="flex mt-1 text-xs items-center justify-between">
        {nPages >= 2 && (
          <PaginationBtns
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default EventList;
