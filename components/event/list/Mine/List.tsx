"use client";
import EventCard from "./EventCard";
import { IEvent } from "@/types/type";
import { useState } from "react";
import usePagination from "@/components/hooks/usePagination";

import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";

type Props = {
  events: IEvent[];
};

const List = ({ events }: Props) => {

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(currentPage, events);

  return (
    <div className="mb-20">
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc, i) => (
            <EventCard key={doc.id} event={doc} i={i} />
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
        <NoFetchedData
          title="No Events"
          text="You ain't created any events yet."
        />
      )}
    </div>
  );
};

export default List;
