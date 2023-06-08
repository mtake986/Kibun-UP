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


type Props = {
  q: IQuote[];
};

const List = ({ q }: Props) => {
  const [user] = useAuthState(auth);

  return (
    <div className="mt-2">
      {/* {q.length} */}
      {q.map((quote, i) => (
        <QuoteCard key={i} q={quote} i={i} />
      ))}
    </div>
  );
};

export default List;
