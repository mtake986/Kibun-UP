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
import { IQuote } from "@/types/type";

const Quote = () => {
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
  } = useQuote();

  const [loading, setLoading] = useState<boolean>(true);
  const [randomQuote, setRandomQuote] = useState<IQuote>();

  const { loginUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    // setRandomQuote(undefined);
    // setLockedQuote(undefined);
    getLockedQuote(loginUser?.uid);
    getRandomQuote(setLoading);
    loginUser && fetchQuotesForHomePage(loginUser);
    chooseRandomQuote();
    setLoading(false);
  }, [loginUser]);

  const chooseRandomQuote = () => {
    const randomNum = getRandomNum(quotesForHomePage.length);
    setRandomQuote(quotesForHomePage[randomNum]);
    console.log("randomQuote", randomQuote);
  };
  if (loading === true) {
    return (
      <div className="mt-10 flex-col items-center">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }
  if (loginUser) {
    if (lockedQuote) {
      return (
        <div className="mt-6 rounded-lg p-12 py-16 shadow">
          <strong className="text-xl">{lockedQuote.quote}</strong>
          <div className="flex flex-col items-end">
            <div className="mt-4 text-right">
              <span>- {lockedQuote.person}</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {lockedQuote ? (
                <Button
                  onClick={() => {
                    alert("To refresh, unlock this quote first.");
                  }}
                  className={`cursor-not-allowed opacity-30 duration-300 hover:bg-slate-50 hover:text-slate-500 sm:w-auto`}
                  variant="ghost"
                >
                  <BiRefresh size={20} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      getRandomQuote(setLoading);
                      setLoading(false);
                    }, 1000);
                  }}
                  className={` duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
                  variant="ghost"
                >
                  <BiRefresh size={20} />
                </Button>
              )}

              <Button
                onClick={() => {
                  removeLockThisQuote(loginUser.uid);
                }}
                className={`text-red-500  duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
                variant="ghost"
              >
                <BiLock size={20} />
              </Button>

              {/* {lockedQuote ? (
                <Button
                  onClick={() => {
                    removeLockThisQuote(loginUser.uid);
                  }}
                  className={`text-red-500  duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
                  variant="ghost"
                >
                  <BiLock size={20} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    lockThisQuote(loginUser.uid, randomQuote);
                  }}
                  className={`duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
                  variant="ghost"
                >
                  <BiLockOpen size={20} />
                </Button>
              )} */}
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="mt-6 flex flex-col items-center rounded-lg p-12 py-16 shadow">
        <p>Login to create quotes</p>
        <GoogleLoginBtn />
      </div>
    );
  }
  return <div>Going wrong here</div>;
};

export default Quote;
