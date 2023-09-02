"use client";
import React, { Suspense, useEffect, useState } from "react";
import { auth, db } from "@/config/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import QuoteCard from "./QuoteCard";
import { useQuote } from "@/context/QuoteContext";
import { IQuote } from "@/types/type";
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";
import { SearchBar } from "./SearchBar";
import NoFetchedData from "@/components/utils/NoFetchedData";
import OrderSelect from "./Sort/OrderSelect";
import ElementSelect from "./Sort/ElementSelect";

type Props = {
  quotes: IQuote[];
};

const ListOfBookmarks = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);

  const { filteredLoginUserQuotes } = useQuote();

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, quotes);

  return (
    <div className="mb-20">
      <div className="my-2 flex flex-col items-center gap-2 sm:flex-row">
        {/* <SortBtn /> */}
        <div className="flex w-full flex-row gap-3">
          <OrderSelect />
          <ElementSelect />
        </div>

        <SearchBar />
      </div>
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

export default ListOfBookmarks;
