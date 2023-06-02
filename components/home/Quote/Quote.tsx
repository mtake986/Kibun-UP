"use client";
import React, { useEffect, useState } from "react";
import { builtInQuotes } from "../../../public/CONSTANTS";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";

const Quote = () => {
  const [todaysQuote, setTodaysQuote] = useState<any>();
  const [loading, setLoading] = useState(true);
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    setLoading(true);
    onSnapshot(collection(db, "quotes"), (snapshot) => {
      snapshot.docs.length > 0
        ? setTodaysQuote(
            snapshot.docs[getRandomInt(snapshot.docs.length)].data()
          )
        : setTodaysQuote(builtInQuotes[0]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="mt-6 p-12 flex-col items-center">
        <Skeleton className="w-full h-32" />
        <span className="flex justify-end mt-4 ">
          <Skeleton className="h-7 w-32" />
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 p-12">
      <strong className="text-xl">{todaysQuote.quote}</strong>
      <div className="mt-4 text-right">
        <span>
          - {todaysQuote.person}
        </span>
      </div>
    </div>
  );
};

export default Quote;
