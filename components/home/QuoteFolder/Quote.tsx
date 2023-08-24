"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import { BiLock, BiLockOpen, BiRefresh } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import UrlLink from "@/components/utils/UrlLink";
import { useAuth } from "@/context/AuthContext";

const Quote = () => {
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

  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const { loginUser, fetchLoginUser } = useAuth();

  // useEffect(() => {
  //   // setLoading(true);
  //   try {
  //     setLoading(true);
  //     if (loading) {
  //       setRandomQuote(undefined);
  //       setLockedQuote(undefined);
  //       fetchLoginUser(user);
  //       getLockedQuote(user?.uid);
  //       getRandomQuote();
  //     }
  //   } catch (error) {
  //     console.log("Quote Component, ", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [lockedQuote, loginUser, loading]);

  useEffect(() => {
    setLoading(true);
    // setRandomQuote(undefined);
    // setLockedQuote(undefined);

    try {
      fetchLoginUser(user);
      getLockedQuote(user?.uid);
      getRandomQuote();
      console.log("useffetct");
    } catch (error) {
    } finally {
      setLoading(false);

    }
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
      if (!lockedQuote && !randomQuote) {
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
      } else if (lockedQuote) {
        return (
          <div className="mb-20 mt-6 rounded-lg p-12 py-16 shadow">
            {loginUser?.displayName}
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
                    getRandomQuote();
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
            {loginUser?.displayName}
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
