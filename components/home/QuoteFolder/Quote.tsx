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
import useFetchTags from "@/components/hooks/useFetchTags";

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
    return (
      <div className="mb-20 mt-10 flex-col items-center">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!loading && !isPending) {
    if (user) {
      if (lockedQuote) {
        return (
          <div className="mb-20 px-5 py-6 sm:rounded-lg sm:px-12 sm:pb-12 sm:pt-6 sm:shadow">
            <div className="">
              <strong className="text-lg sm:text-xl">
                {lockedQuote.quote}
              </strong>

              <div className="flex justify-between items-center mt-4 text-right text-xs">
                <span>by {lockedQuote.person}</span>
                <div className="flex items-center gap-5">
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
                      removeLockFromThisQuote(user.uid);
                    }}
                    className={`cursor-pointer text-red-500 duration-300 hover:opacity-50`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      } else if (loginUser?.settings.quoteTypeForHome === "appChoice") {
        return (
          <div className="mb-20 px-5 py-6 sm:rounded-lg sm:px-12 sm:pb-12 sm:pt-6 sm:shadow">
            <div className="">
              <strong className="text-lg sm:text-xl">{data?.quote}</strong>
              <div className="flex flex-col items-end">
                <div className="mt-4 text-right  text-xs">
                  <span>by {data?.person}</span>
                </div>
                <div className="mt-4 flex items-center gap-5">
                  <BiRefresh
                    size={20}
                    onClick={() => {
                      refetch();
                    }}
                    className={`cursor-pointer duration-300 hover:opacity-50`}
                  />

                  <BiLockOpen
                    size={16}
                    onClick={() => {
                      lockThisQuote(user.uid, data);
                    }}
                    className={`cursor-pointer duration-300 hover:opacity-50`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mb-20 px-5 py-6 sm:rounded-lg sm:px-12 sm:pb-12 sm:pt-6 sm:shadow">
            <div className="">
              <strong className="text-lg sm:text-xl">
                {randomQuote?.quote}
              </strong>
              <div className="flex flex-col items-end">
                <div className="mt-4 text-right  text-xs">
                  <span>by {randomQuote?.person}</span>
                </div>
                <div className="mt-4 flex items-center gap-5">
                  <BiRefresh
                    size={20}
                    onClick={() => {
                      updateRandomQuote();
                    }}
                    className={`cursor-pointer duration-300 hover:opacity-50`}
                  />

                  <BiLockOpen
                    size={16}
                    onClick={() => {
                      if (randomQuote) lockThisQuote(user.uid, randomQuote);
                    }}
                    className={`cursor-pointer duration-300 hover:opacity-50`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
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
