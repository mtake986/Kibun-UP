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
    [id: number]: {
      createdAt: any;
      id: string;
      person: string;
      quote: string;
      uid: string;
    };
  };
  const [quotes, setQuotes] = useState<quotesType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true),
      onSnapshot(collection(db, "quotes"), (snapshot) => {
        const quotesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(quotesData);
        setQuotes(quotesData);
      });
    setLoading(false);
  }, []);

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mt-4 mb-2">Your Quotes</h2>
      {quotes.map((quote, i) => (
        <QuoteCard key={i} q={quote} />
      ))}
    </div>
  );
};

export default List;
