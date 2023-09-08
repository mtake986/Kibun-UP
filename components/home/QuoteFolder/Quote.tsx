"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import { BiLock, BiLockOpen, BiRefresh } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import UrlLink from "@/components/utils/UrlLink";
import { useAuth } from "@/context/AuthContext";
import HeadingFive from "@/components/utils/HeadingFive";
import { ILoginUser } from "@/types/type";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

const Quote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const {
    randomQuote,
    getRandomQuote,
    lockThisQuote,
    lockedQuote,
    removeLockThisQuote,
    getLockedQuote,
    setRandomQuote,
    setLockedQuote,
    updateRandomQuote,
    whichList,
    fetchQuotesForHomePage,
  } = useQuote();

  const { loginUser, fetchLoginUser } = useAuth();
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        fetchLoginUser(user);
        getLockedQuote();
        updateRandomQuote(user);
      } catch (error) {
        console.log("fetchDocuments, ", error);
      }
      setLoading(false);
    };
    // console.log("components mounted");
    fetchDocuments();
  }, [user]);

  if (loading) {
    return (
      <div className="mb-20 mt-10 flex-col items-center">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!loading) {
    if (user) {
      if (lockedQuote) {
        return (
          <div className="mb-20 mt-5 px-5 py-6 sm:rounded-lg sm:px-12 sm:pb-12 sm:pt-6 sm:shadow">
            {/* <div className="mb-2 text-center text-xs sm:text-sm">
              {"< Today's Phrase >"}
            </div> */}
            <div className="">
              <strong className="text-lg sm:text-xl">
                {lockedQuote.quote}
              </strong>

              <div className="flex flex-col items-end">
                <div className="mt-4 text-right text-xs">
                  <span>by {lockedQuote.person}</span>
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
                      removeLockThisQuote(user.uid);
                      // getRandomQuote();
                    }}
                    className={`text-red-500 duration-300 hover:opacity-50`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      } else if (randomQuote) {
        return (
          <div className="mb-20 mt-5 px-5 py-6 sm:rounded-lg sm:px-12 sm:pb-12 sm:pt-6 sm:shadow">
            {/* <div className="mb-2 text-center text-xs sm:text-sm">
              {"< Today's Phrase >"}
            </div> */}
            <div className="">
              <strong className="text-lg sm:text-xl">
                {randomQuote.quote}
              </strong>
              <div className="flex flex-col items-end">
                <div className="mt-4 text-right  text-xs">
                  <span>by {randomQuote.person}</span>
                </div>
                <div className="mt-4 flex items-center gap-5">
                  <BiRefresh
                    size={20}
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        updateRandomQuote(user);
                        setLoading(false);
                      }, 1000);
                    }}
                    className={`cursor-pointer duration-300 hover:opacity-50`}
                  />

                  <BiLockOpen
                    size={16}
                    onClick={() => {
                      lockThisQuote(user.uid, randomQuote);
                    }}
                    className={`cursor-pointer duration-300 hover:opacity-50`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      } else if (!lockedQuote && !randomQuote) {
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
    } else {
      return (
        <div className="mt-6 flex flex-col items-center p-12 py-16 sm:rounded-lg sm:shadow">
          <p>Login to create quotes</p>
          <GoogleLoginBtn />
        </div>
      );
    }
  }
  return <div>Going wrong here</div>;
};

export default Quote;
