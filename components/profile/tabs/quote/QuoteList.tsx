"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuoteCard from "@/components/profile/tabs/quote/QuoteCard";
import { useQuote } from "@/app/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";

const QuoteList = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    loginUserQuotes,
    getLoginUserQuotes,
    getLockedQuote,
    fetchFavQuotes,
  } = useQuote();

  useEffect(() => {
    setLoading(true);
    getLoginUserQuotes();
    getLockedQuote(user?.uid);
    fetchFavQuotes();
    setLoading(false);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, loginUserQuotes);

  if (loading) return <div>loading</div>;

  if (!loading && loginUserQuotes.length === 0) return <div>No Quotes</div>;

  return (
    <div>
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
        <div className="mt-10">
          <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
            You have no events
          </h2>
        </div>
      )}
    </div>
  );
};

export default QuoteList;
