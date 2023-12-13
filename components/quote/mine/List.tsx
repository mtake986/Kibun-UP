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
import Modal from "./modal/Modal";

type Props = {
  quotes: TypeQuote[];
};

const List = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);

  const {
    sortFilterAreaForMineShown,
    isSortVariablesForMineDefaultValue,
    sortedFilteredMyQuotes,
    sortVariablesForMine,
  } = useQuote();

  console.log(quotes, quotes.length);
  const [currentPage, setCurrentPage] = useState(1);
  const { nPages, currentRecords } = usePagination(
    currentPage,
    quotes,
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
      <div className="flex items-center justify-between">
        {nPages >= 2 && (
          <PaginationBtns
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <Modal />
      </div>
      <div className="mb-2 flex flex-col gap-3 text-gray-400">
        {quotes.length} quotes found
      </div>
      {displayCards()}
    </div>
  );
};

export default List;
