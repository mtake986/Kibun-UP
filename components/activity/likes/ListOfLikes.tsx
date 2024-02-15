"use client";
import React, { useMemo, useState } from "react";
import { TypeUserFromFirestore, TypeQuote } from "@/types/type";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import { useQuotesLikedByLoginUser } from "@/components/hooks/useQuotesLikedByLoginUser";
import usePaginationTenItems from "@/components/hooks/usePaginationTenItems";

type Props = {
  loginUserQuotes: TypeQuote[];
  loginUser: TypeUserFromFirestore;
};

const ListOfLikes = ({ loginUserQuotes, loginUser }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePaginationTenItems(
    currentPage,
    useQuotesLikedByLoginUser(loginUserQuotes, loginUser)
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

export default ListOfLikes;
