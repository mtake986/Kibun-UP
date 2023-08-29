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

const Quote = () => {
  const [loading, setLoading] = useState<boolean>(true);
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
  } = useQuote();

  const { loginUser, fetchLoginUser } = useAuth();
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      getLockedQuote(user?.uid);
      getRandomQuote();
      fetchLoginUser(user);
    } catch (error) {
      console.log("fetchDocuments, ", error);
    }
    setLoading(false);
  };
  useEffect(() => {
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

  // return (
  //   <div>
  //     {loading ? <span>loading...</span> : "done"}
  //     {lockedQuote ? (
  //       <span>lock: {lockedQuote.quote}</span>
  //     ) : randomQuote ? (
  //       <span>random: {randomQuote.quote}</span>
  //     ) : null}
  //   </div>
  // );

  if (!loading) {
    if (user) {
      if (lockedQuote) {
        return (
          <div className="mb-20 px-5 py-10 sm:mt-6 sm:rounded-lg sm:p-12 sm:py-16 sm:shadow">
            <strong className="text-xl">{lockedQuote.quote}</strong>
            <div className="flex flex-col items-end">
              <div className="mt-4 text-right text-xs">
                <span>by {lockedQuote.person}</span>
              </div>
              <div className="mt-4 flex items-center gap-5">
                <BiRefresh
                  size={24}
                  onClick={() => {
                    alert("To refresh, unlock this quote first.");
                  }}
                  className={`cursor-not-allowed opacity-30 duration-300`}
                />
                <BiLock
                  size={20}
                  onClick={() => {
                    removeLockThisQuote(user.uid);
                    // getRandomQuote();
                  }}
                  className={`text-red-500 duration-300 hover:opacity-50`}
                />
              </div>
            </div>
          </div>
        );
      } else if (randomQuote) {
        return (
          <div className="mb-20 px-5 py-10 sm:mt-6 sm:rounded-lg sm:p-12 sm:py-16 sm:shadow">
            <strong className="text-xl">{randomQuote.quote}</strong>
            <div className="flex flex-col items-end">
              <div className="mt-4 text-right  text-xs">
                <span>by {randomQuote.person}</span>
              </div>
              <div className="mt-4 flex items-center gap-5">
                <BiRefresh
                  size={24}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      getRandomQuote();
                      setLoading(false);
                    }, 1000);
                  }}
                  className={`cursor-pointer duration-300 hover:opacity-50`}
                />

                <BiLockOpen
                  size={20}
                  onClick={() => {
                    lockThisQuote(user.uid, randomQuote);
                  }}
                  className={`cursor-pointer duration-300 hover:opacity-50`}
                />
              </div>
            </div>
          </div>
        );
      } else if (!lockedQuote && !randomQuote) {
        return (
          <div className="mb-20 mt-10 rounded-lg p-12 text-center">
            <p className="text-lg">You have no quotes yet.</p>
            <UrlLink
              href="/quote"
              className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
              clickOn="Click here to create an quote"
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
