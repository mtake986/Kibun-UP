"use client";
import React, { useState } from "react";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import usePagination from "@/components/hooks/usePagination";

import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import QuoteCard from "@/components/quoteCard/QuoteCard";

type Props = {
  quotes: TypeQuote[];
  loginUser: TypeLoginUser;
};

const ListOfBookmarks = ({ quotes, loginUser }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const quotesBookmarkedByLoginUser = quotes.filter((q) =>
    q.bookmarkedBy.includes(loginUser.uid)
  );

  const { nPages, currentRecords } = usePagination(
    currentPage,
    quotesBookmarkedByLoginUser
  );

  return (
    <div className="mb-20">
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
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default ListOfBookmarks;
