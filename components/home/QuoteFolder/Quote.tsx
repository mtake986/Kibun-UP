"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import { BiLock, BiLockOpen, BiRefresh } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import UrlLink from "@/components/utils/UrlLink";
import { useAuth } from "@/context/AuthContext";
import { getRandomNum } from "@/utils/functions";
import { ILoginUser, IQuote } from "@/types/type";

type Props = {
  quote?: IQuote;
  type: string;
  loginUser?: ILoginUser;
};

const Quote = ({ quote, type, loginUser }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const {
    // randomQuote,
    getRandomQuote,
    lockThisQuote,
    lockedQuote,
    removeLockThisQuote,
    getLockedQuote,
    // setRandomQuote,
    setLockedQuote,
    fetchQuotesForHomePage,
    quotesForHomePage,
    getLoginUserQuotes,
    fetchMyBookmarks,
  } = useQuote();

  // if (loading === true) {
  //   return (
  //     <div className="mt-10 flex-col items-center">
  //       <Skeleton className="h-48 w-full" />
  //     </div>
  //   );
  // }

  return (
    <div className="mt-6 rounded-lg p-12 py-16 shadow">
      <div className="bg-gray-200 p-5">
        {loginUser?.displayName}, {type}, {quote?.quote}
      </div>
      <strong className="text-xl">{quote?.quote}</strong>
      <div className="flex flex-col items-end">
        <div className="mt-4 text-right">
          <span>- {quote?.person}</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Button
            onClick={() => {
              if (type === "random") {
                getRandomQuote(setLoading);
              } else if (type === "random") {
                alert("To refresh, unlock this quote first.");
              }
            }}
            className={`duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
            variant="ghost"
            disabled={type === "lock" ? true : false}
          >
            <BiRefresh size={20} />
          </Button>

          <Button
            onClick={() => {
              if (type === "lock") {
                loginUser && removeLockThisQuote(loginUser.uid);
              } else {
                if (quote && loginUser) {
                  lockThisQuote(loginUser.uid, quote);
                } else {
                  console.log(quote);
                  console.log(loginUser);
                }
              }
            }}
            className={`${
              type === "lock" && "text-red-500 "
            }  duration-300 hover:bg-red-50 hover:text-red-500 `}
            variant="ghost"
          >
            <BiLock size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
