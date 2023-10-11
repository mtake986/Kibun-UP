"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import { BiLock, BiLockOpen, BiRefresh } from "react-icons/bi";
import { useAuth } from "@/context/AuthContext";
import useFetchQuoteFromQuotableAPI from "@/components/hooks/useFetchQuoteFromQuotableAPI";
import {
  fontMerriweather,
  fontRaleway,
  fontRoboto,
} from "@/components/utils/fonts";
import QuoteContent from "./QuoteContent";
import QuoteCard from "./QuoteCard";
import { IQuote } from "@/types/type";

const Quote = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user] = useAuthState(auth);
  const {
    randomQuote,
    updateRandomQuote,
    lockThisQuote,
    lockedQuote,
    removeLockFromThisQuote,
    getLockedQuote,
  } = useQuote();

  const { loginUser, fetchLoginUser } = useAuth();
  const { data, isPending, error, refetch } = useFetchQuoteFromQuotableAPI();
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      getLockedQuote();
      updateRandomQuote();
      fetchLoginUser(user);
    } catch (error) {
      console.log("fetchDocuments, ", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user) fetchDocuments();
  }, [user, data]);

  if (loading || isPending) {
    return <Skeleton className="mb-20 mt-10 h-48 w-full" />;
  }

  if (!loading && !isPending) {
    if (user) {
      if (lockedQuote) {
        return <QuoteCard quote={lockedQuote} type="locked" />;
      } else if (loginUser?.settings.quoteTypeForHome === "appChoice") {
        return <QuoteCard quote={data} type="appChoice" />;
      } else if (randomQuote) {
        return <QuoteCard quote={randomQuote as IQuote} type="notAppChoice" />;
      }
      // else {
      //   return (
      //     <div className="mb-20 mt-10 rounded-lg p-12 text-center">
      //       <UrlLink
      //         href="/quote"
      //         className="cursor-pointer text-sm text-blue-400 underline duration-300 hover:opacity-70"
      //         clickOn="You have no quotes yet."
      //         target="_self"
      //       />
      //     </div>
      //   );
      // }
    } else {
      return (
        <div className="mt-6 flex flex-col items-center p-12 py-16 sm:rounded-lg sm:shadow">
          <p>Login to create quotes</p>
          <GoogleLoginBtn />
        </div>
      );
    }
  }
  return <div>Something wrong here</div>;
};

export default Quote;
