"use client";
import React, { useEffect, useState } from "react";
import { builtInQuotes } from "../../../public/CONSTANTS";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/app/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { IQuote } from "@/types/type";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/app/context/QuoteContext";

const Quote = () => {
  const { getTodaysQuote, todaysQuotes } = useQuote();

  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setLoading(true);
    getTodaysQuote();
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="mt-6 flex-col items-center p-12">
        <Skeleton className="h-32 w-full" />
        <span className="mt-4 flex justify-end ">
          <Skeleton className="h-7 w-32" />
        </span>
      </div>
    );
  } else {
    if (user) {
      if (todaysQuotes?.length === 0) {
        return (
          <div className="mt-10 rounded-lg bg-violet-50 p-12 text-center">
            <p>No Quote's to Display</p>
            <Link
              href="/quote"
              className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
            >
              Click here to create an quote
            </Link>
          </div>
        );
      } else if (todaysQuotes?.length > 0) {
        return (
          <div className="mt-6 p-12">
            <strong className="text-xl">
              {todaysQuotes[0].quote}
            </strong>
            <div className="mt-4 text-right">
              <span>
                - {todaysQuotes[0].person}
              </span>
            </div>
          </div>
        );
      }
    } else {
      return (
        <GoogleLoginBtn />
      );
    }
  }
  return <div>Going wrong here</div>;
};

export default Quote;
