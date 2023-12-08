"use client";

import { auth, db } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TypeEvent, TypeLoginUser } from "@/types/type";
import { useEffect, useState } from "react";
import usePagination from "@/components/hooks/usePagination";

import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import EventCard from "@/components/eventCard/EventCard";
import UrlLink from "@/components/utils/UrlLink";

type Props = {
  events: TypeEvent[];
};

const List = ({ events }: Props) => {
  const [user] = useAuthState(auth);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(currentPage, events);

  const goPrevAsNoCurrentRecords = () => {
    if (
      currentPage === nPages &&
      currentRecords.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="mb-20">
      {currentRecords && currentRecords.length >= 1 ? (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc, i) => (
            <EventCard
              key={doc.id}
              event={doc}
              goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
            />
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
        <div>
          <NoFetchedData text="No events found" />
          <UrlLink
            href="/event/register"
            target="_self"
            clickOn="Create an event"
            className="text-xs text-sky-500 underline-offset-2 hover:underline sm:text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default List;
