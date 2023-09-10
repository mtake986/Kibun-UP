"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import { BiLock, BiLockOpen, BiRefresh } from "react-icons/bi";
import UrlLink from "@/components/utils/UrlLink";
import { IQuote } from "@/types/type";

type Props = {
  q: IQuote;
};
const Quote = ({ q }: Props) => {
  const [user] = useAuthState(auth);
  const {
    removeLockThisQuote,
  } = useQuote();

  if (q) {
    return (
      <div className="mb-20 mt-5 px-5 py-6 sm:rounded-lg sm:px-12 sm:pb-12 sm:pt-6 sm:shadow">
        {/* <div className="mb-2 text-center text-xs sm:text-sm">
              {"< Today's Phrase >"}
            </div> */}
        <div className="">
          <strong className="text-lg sm:text-xl">{q.quote}</strong>

          <div className="flex flex-col items-end">
            <div className="mt-4 text-right text-xs">
              <span>by {q.person}</span>
            </div>
            <div className="mt-4 flex items-center gap-5">
              <BiRefresh
                size={20}
                onClick={() => {
                  alert("To refresh, unlock this quote first.");
                }}
                className={`cursor-not-allowed opacity-30 duration-300`}
              />
              <BiLock
                size={16}
                onClick={() => {
                  user && removeLockThisQuote(user.uid);
                  // getRandomQuote();
                }}
                className={`cursor-pointer text-red-500 duration-300 hover:opacity-50`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-20 mt-10 rounded-lg p-12 text-center">
        <UrlLink
          href="/quote"
          className="cursor-pointer text-sm text-blue-400 underline duration-300 hover:opacity-70"
          clickOn="You have no quotes yet."
          target="_self"
        />
      </div>
    );
  }
};

export default Quote;
