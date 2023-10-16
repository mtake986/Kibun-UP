"use client";
import { IEvent } from "@/types/type";
import CardNotMine from "./EventCard";
import { useState } from "react";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import usePagination from "@/components/hooks/usePagination";

type Props = {
  eventsNotMine: IEvent[];
};

const List = ({ eventsNotMine }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(currentPage, eventsNotMine);

  return (
    <div className="mb-20">
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc, i) => (
            <CardNotMine key={doc.id} event={doc} i={i} />
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
        <NoFetchedData title="No Events" text="Other users ain't created any events yet." />
      )}
    </div>
  );
};

export default List;
