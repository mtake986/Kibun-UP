"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuoteCard from "@/components/profile/tabs/quote/QuoteCard";
import { useQuote } from "@/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import OrderSelect from "./Sort/OrderSelect";
import ElementSelect from "./Sort/ElementSelect";
import { SearchBar } from "./Sort/SearchBar";
import { IQuote } from "@/types/type";
import Btns from "./Sort/Btns";
import SortFilterQuotes from "./Sort/SortFilterQuotes";
import OnlySortBtn from "./Sort/OnlySortBtn";

type Props = {
  quotes: IQuote[];
};

const QuoteList = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { filteredLoginUserQuotes, sortFilterAreaForMineShown } = useQuote();

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, quotes);

  if (loading) return <div>loading</div>;

  // if (!loading && loginUserQuotes.length === 0) return <div>No Quotes</div>;
  return (
    <div className="mb-20">
      {sortFilterAreaForMineShown ? <SortFilterQuotes /> : null}
      <div className="my-2 hidden flex-col items-center gap-2 sm:flex sm:flex-row">
        {/* <SortBtn /> */}
        <div className="flex w-full flex-row gap-3">
          <OrderSelect />
          <ElementSelect />
          <OnlySortBtn />
        </div>

        <SearchBar />
        <Btns />
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
