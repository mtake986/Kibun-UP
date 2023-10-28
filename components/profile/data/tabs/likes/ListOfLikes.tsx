"use client";
import React, { useMemo, useState } from "react";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import usePagination from "@/components/hooks/usePagination";

import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import { useQuotesLikedByLoginUser } from "@/components/hooks/useQuotesLikedByLoginUser";

type Props = {
  quotes: TypeQuote[];
  loginUser: TypeLoginUser;
};

const ListOfLikes = ({ quotes, loginUser }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(
    currentPage,
    useQuotesLikedByLoginUser(quotes, loginUser),
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
