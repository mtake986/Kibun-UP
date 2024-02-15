"use client";
import React, { useState } from "react";
import { TypeUserFromFirestore, TypeQuote } from "@/types/type";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import { useQuotesBookmarkedByLoginUser } from "@/components/hooks/useQuotesBookmarkedByLoginUser";
import usePaginationTenItems from "@/components/hooks/usePaginationTenItems";

type Props = {
  loginUserQuotes: TypeQuote[];
  loginUser: TypeUserFromFirestore;
};

const ListOfBookmarks = ({ loginUserQuotes, loginUser }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const quotesBookmarkedByLoginUser = useQuotesBookmarkedByLoginUser(
    loginUserQuotes,
    loginUser
  );
  const { nPages, currentRecords } = usePaginationTenItems(
    currentPage,
    quotesBookmarkedByLoginUser
  );

  return (
    <div className="mb-20">
      {currentRecords && currentRecords.length >= 1 ? (
        <div className="flex flex-col gap-3">
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
        </div>
      ) : (
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default ListOfBookmarks;
