"use client";
import React, { useEffect, useState } from "react";
import { useQuote } from "@/context/QuoteContext";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import usePagination from "@/components/hooks/usePagination";

const QuoteList = () => {
  const { profileUserQuotes } = useQuote();
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(
    currentPage,
    profileUserQuotes
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
            <QuoteCard
              q={doc}
              key={doc.id}
              goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
            />
          ))}
        </div>
      );
    } else {
      return <NoFetchedData text="No quotes found" />;
    }
  };

  return (
    <div className="mb-20">
      <div className="my-1 flex flex-col gap-3 text-xs text-gray-400">
        {profileUserQuotes.length} quotes found
      </div>
      {displayCards()}
      <div className="mt-1 flex items-center justify-between">
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

export default QuoteList;
