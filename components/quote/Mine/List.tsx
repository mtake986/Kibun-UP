"use client";
import React, { Suspense, useEffect, useState } from "react";
import { auth, db } from "@/app/config/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import QuoteCard from "./QuoteCard";
import { useQuote } from "@/app/context/QuoteContext";
import { IQuote } from "@/types/type";
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";

type Props = {
  quotes: IQuote[];
};

const List = ({ quotes }: Props) => {
  const [user] = useAuthState(auth);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, quotes);

  return (
    <div>
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
        <div className="mt-10">
          <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
            You have no quotes
          </h2>
        </div>
      )}
    </div>
  );
};

export default List;