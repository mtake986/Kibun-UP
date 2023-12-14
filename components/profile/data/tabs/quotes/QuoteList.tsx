"use client";
import React, { useEffect, useState } from "react";
import { useQuote } from "@/context/QuoteContext";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import SortFilterQuotes from "./Sort/SortFilterQuotes";
import QuoteCard from "@/components/quoteCard/QuoteCard";

import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import usePaginationTenItems from "@/components/hooks/usePaginationTenItems";


const QuoteList = () => {

  const {profileUserQuotes} = useQuote();
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePaginationTenItems(
    currentPage,
    profileUserQuotes
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (isLoading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <LoadingSpinnerL />
      </div>
    );
  }

  const goPrevAsNoCurrentRecords = () => {
    if (
      currentPage === nPages &&
      currentRecords.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // if (!loading && loginUserQuotes.length === 0) return <div>No Quotes</div>;
  return (
    <div className="mb-20">
      {currentRecords && currentRecords.length >= 1 ? (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc) => (
            <QuoteCard
              key={doc.id}
              q={doc}
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
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default QuoteList;
