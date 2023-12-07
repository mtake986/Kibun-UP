"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuote } from "@/context/QuoteContext";
import { TypeQuote } from "@/types/type";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import SortFilterMine from "./sort/SortFilterMine";
import usePagination from "@/components/hooks/usePagination";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import Image from "next/image";

type Props = {
  quotes: TypeQuote[];
};

const List = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);

  const {
    sortFilterAreaForMineShown,
  } = useQuote();

  const [currentPage, setCurrentPage] = useState(1);
  const { nPages, currentRecords } = usePagination(currentPage, quotes);

  useEffect(() => {
    if (currentPage > nPages && currentRecords.length === 0)
      setCurrentPage((prev) => prev - 1);
    // setCurrentPage(prev => prev-1);
  }, [currentRecords]);

  return (
    <div className="mb-20">
      {sortFilterAreaForMineShown ? <SortFilterMine /> : null}
      {/* bug when delete the last element in the last page */}
      {/* because the if is based on currentRecords. quotes exist, but not currentRecords */}
      {currentRecords && currentRecords.length >= 1 ? (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc, i) => (
            <QuoteCard q={doc} key={doc.id} />
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

export default List;
