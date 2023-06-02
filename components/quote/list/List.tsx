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
    // const fetchQuotes = async () => {
    //   const q = query(collection(db, "quotes"));
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     setQuotes((prev) => [...prev, {...doc.data(), id: doc.id}]);
    //   });
    // };
    // fetchQuotes();
      onSnapshot(collection(db, "quotes"), (snapshot) => {
        setQuotes(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
      });
  }, []);

  return (
    <div>
      <h2 className="mb-2 mt-4 text-center text-3xl font-bold">Your {quotes.length} Quotes</h2>
      {quotes.map((quote, i) => (
        <QuoteCard key={i} q={quote} />
      ))}
    </div>
  );
};

export default List;
