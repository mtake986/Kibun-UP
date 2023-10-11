"use client";
import React, { Suspense, useEffect, useState } from "react";
import { auth, db } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import QuoteCard from "./QuoteCard";
import { useQuote } from "@/context/QuoteContext";
import { TypeQuote } from "@/types/type";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import SortFilterMine from "./Sort/SortFilterMine";
import usePagination from "@/components/hooks/usePagination";

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
            <QuoteCard key={doc.id} q={doc} i={i} />
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
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default List;
