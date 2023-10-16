"use client";
import React, { useState } from "react";
import { auth, db } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuote } from "@/context/QuoteContext";
import { TypeQuote } from "@/types/type";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import SortFilterMine from "./sort/SortFilterMine";
import usePagination from "@/components/hooks/usePagination";
import QuoteCard from "@/components/quoteCard/QuoteCard";

type Props = {
  quotes: TypeQuote[];
};

const List = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);

  const { sortFilterAreaForMineShown } = useQuote();

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(currentPage, quotes);

  return (
    <div className="mb-20">
      {/* todo: move to dialog */}
      {sortFilterAreaForMineShown ? <SortFilterMine /> : null}

      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc, i) => (
            <QuoteCard key={doc.id} q={doc} />
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
        <NoFetchedData title="No Quotes" text="You ain't created any quotes yet." />
      )}
    </div>
  );
};

export default List;