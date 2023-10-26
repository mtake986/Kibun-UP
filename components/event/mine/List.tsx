"use client";

import { auth, db } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TypeEvent } from "@/types/type";
import { useState } from "react";
import usePagination from "@/components/hooks/usePagination";

import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import EventCard from "@/components/eventCard/EventCard";

type Props = {
  events: TypeEvent[];
};

const List = ({ events }: Props) => {
  const [user] = useAuthState(auth);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(currentPage, events);

  return (
    <div className="mb-20">
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc, i) => (
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

export default List;
