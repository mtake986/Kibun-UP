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
          <div className="mb-20 mt-6 rounded-lg p-12 py-16 shadow">
            <strong className="text-xl">{lockedQuote.quote}</strong>
            <div className="flex flex-col items-end">
              <div className="mt-4 text-right">
                <span>- {lockedQuote.person}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button
                  onClick={() => {
                    alert("To refresh, unlock this quote first.");
                  }}
                  className={`cursor-not-allowed opacity-30 duration-300 hover:bg-slate-50 hover:text-slate-500 sm:w-auto`}
                  variant="ghost"
                >
                  <BiRefresh size={20} />
                </Button>
                <Button
                  onClick={() => {
                    removeLockThisQuote(user.uid);
                    // getRandomQuote();
                  }}
                  className={`text-red-500 duration-300 hover:bg-red-50 hover:text-red-500`}
                  variant="ghost"
                >
                  <BiLock size={20} />
                </Button>
              </div>
            </div>
          </div>
        );
      } else if (randomQuote) {
        return (
          <div className="mb-20 mt-6 rounded-lg p-12 py-16 shadow">
            <strong className="text-xl">{randomQuote.quote}</strong>
            <div className="flex flex-col items-end">
              <div className="mt-4 text-right">
                <span>- {randomQuote.person}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      getRandomQuote();
                      setLoading(false);
                    }, 1000);
                  }}
                  className={` duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
                  variant="ghost"
                >
                  <BiRefresh size={20} />
                </Button>

                <Button
                  onClick={() => {
                    lockThisQuote(user.uid, randomQuote);
                  }}
                  className={`duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
                  variant="ghost"
                >
                  <BiLockOpen size={20} />
                </Button>
              </div>
            </div>
          </div>
        );
      } else if (!lockedQuote && !randomQuote) {
        return (
          <div className="mb-20 mt-10 rounded-lg bg-violet-50 p-12 text-center">
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
        <div className="mt-6 flex flex-col items-center rounded-lg p-12 py-16 shadow">
          <p>Login to create quotes</p>
          <GoogleLoginBtn />
        </div>
      );
    }
  }
  return <div>Going wrong here</div>;
};

export default Quote;
