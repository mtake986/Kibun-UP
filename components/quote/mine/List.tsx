"use client";
import React, { useEffect, useState } from "react";
import { TypeQuote } from "@/types/type";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import usePagination from "@/components/hooks/usePagination";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import Modal from "./modal/Modal";

type Props = {
  quotes: TypeQuote[];
};

const List = ({ quotes }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { nPages, currentRecords } = usePagination(currentPage, quotes);

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
    if (currentRecords.length >= 1) {
      return (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc, i) => (
            <QuoteCard
              q={doc}
              key={doc.id}
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
      );
    } else {
      return <NoFetchedData text="No quotes found" />;
    }
  };

  return (
    <div className="mb-20">
      <div className="flex justify-between">
        <p className="text-sm text-gray-400">{quotes.length} quotes found</p>
        <Modal />
      </div>
      {displayCards()}
    </div>
  );
};

export default List;
