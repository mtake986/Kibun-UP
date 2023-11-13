"use client";
import { TypeQuote } from "@/types/type";
import { useState } from "react";
import usePagination from "@/components/hooks/usePagination";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import SortFilterNotMine from "./sort/SortFilterNotMine";
import { useQuote } from "@/context/QuoteContext";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import SelectResultPerPage from "./SelectQuotesPerPage";

const ListOfRandom = () => {
  const {
    currentRecords,
    isPending,
    error,
    refetch,
    nPages,
    currentPage,
    setCurrentPage,
  } = useQuotesFromQuotableAPI();
  // const { nPages, currentRecords } = usePagination(currentPage, quotes);
  const { sortFilterAreaForNotMineShown } = useQuote();

  if (isPending) {
    return <LoadingSpinnerL />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (currentRecords) {
    return (
      <div className="mb-20">
        {sortFilterAreaForNotMineShown ? <SortFilterNotMine /> : null}
        {currentRecords && currentRecords.length >= 1 ? (
          <div className="flex flex-col gap-3">
            {currentRecords.map((doc, i) => (
              <QuoteCard key={doc.id} q={doc} />
            ))}
            <div className="flex items-center justify-between">
              {nPages >= 2 && (
                <PaginationBtns
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
              <SelectResultPerPage  />
            </div>
          </div>
        ) : (
          <NoFetchedData text="No quotes found" />
        )}
      </div>
    );
  }
  return <div>No Quotes Found</div>;
};

export default ListOfRandom;
