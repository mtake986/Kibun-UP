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

const List = () => {
  const [user] = useAuthState(auth);
  type quotesType = {
    // [id: number]: {
      createdAt: any;
      id: string;
      person: string;
      quote: string;
      uid: string;
    // };
  };
  const [quotes, setQuotes] = useState<quotesType[] | any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    onSnapshot(collection(db, "quotes"), (snapshot) => {
      console.log('onsnapshot ===')
      setQuotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  console.log("List.tsx: quotes -> ", quotes);
  return (
    <div>
      <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
        Your {quotes.length} Quotes
      </h2>
      {quotes.map((quote, i) => (
        <QuoteCard key={i} q={quote} i={i}  />
      ))}
    </div>
  );
};

export default List;
