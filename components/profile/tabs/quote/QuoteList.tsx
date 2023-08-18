"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuoteCard from "@/components/profile/tabs/quote/QuoteCard";
import { useQuote } from "@/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import OrderSelect from "./Sort/OrderSelect";
import ElementSelect from "./Sort/ElementSelect";
import { SearchBar } from "./SearchBar";
import { IQuote } from "@/types/type";

type Props = {
  quotes: IQuote[];
};

const QuoteList = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, quotes);

  if (loading) return <div>loading</div>;

  // if (!loading && loginUserQuotes.length === 0) return <div>No Quotes</div>;
  return (
    <div>
      <div className="my-2 flex items-center gap-2">
        {/* <SortBtn /> */}
        <OrderSelect />
        <ElementSelect />
        <SearchBar />
      </div>
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
