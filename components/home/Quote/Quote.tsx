"use client";
import React, { useEffect, useState } from "react";
import { builtInQuotes } from "../../../public/CONSTANTS";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/config/Firebase";

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
      <div className="mt-6 p-12">
        <strong className="text-xl">Loading...</strong>
      </div>
    );
  }

  return (
    <div className="mt-6 p-12">
      <strong className="text-xl">
        {loading ? "loading..." : todaysQuote ? todaysQuote.quote : null}
      </strong>
      <div className="mt-4 text-right">
        <span>
          - {loading ? "loading..." : todaysQuote ? todaysQuote.person : null}
        </span>
      </div>
    </div>
  );
};

export default Quote;
