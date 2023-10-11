"use client";
import React, { useEffect, useState } from "react";
import QuoteCard from "@/components/profile/tabs/quote/QuoteCard";
import { useQuote } from "@/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import usePagination from "@/components/hooks/usePagination";

import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import { TypeQuote } from "@/types/type";
import SortFilterQuotes from "./Sort/SortFilterQuotes";

type Props = {
  quotes: TypeQuote[];
};

const QuoteList = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { sortFilterAreaForMineShown } = useQuote();

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(currentPage, quotes);

  if (loading) return <div>loading</div>;

  // if (!loading && loginUserQuotes.length === 0) return <div>No Quotes</div>;
  return (
    <div className="mb-20">
      {sortFilterAreaForMineShown ? <SortFilterQuotes /> : null}
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc) => (
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
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default QuoteList;
