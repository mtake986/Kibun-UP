"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import useFetchQuoteFromQuotableAPI from "@/components/hooks/useFetchQuoteFromQuotableAPI";
import QuoteCard from "./QuoteCard";
import { TypeQuote } from "@/types/type";
import { createProperUrl } from "@/functions/createProperUrl";
import { displayErrorToast } from "@/functions/displayToast";

const Quote = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user] = useAuthState(auth);
  const { randomQuote, updateRandomQuote, lockedQuote, getLockedQuote } =
    useQuote();

  const { loginUser, fetchLoginUser } = useAuth();

  // https://api.quotable.io/quotes?tags=famous-quotes&page=&limit=1

  const { data, isPending, error, refetch } = useFetchQuoteFromQuotableAPI(
    createProperUrl(loginUser?.settings.tagForQuotableApi)
  );
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      getLockedQuote();
      updateRandomQuote();
      fetchLoginUser(user);
    } catch (e) {
      displayErrorToast(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user]);

  if (loading || isPending) {
    return <Skeleton className="mb-20 h-48 w-full" />;
  }

  // if (!loading && !isPending) {
  // if (user) {
  if (loginUser) {
    if (lockedQuote) {
      return (
        <QuoteCard
          quote={lockedQuote}
          type="locked"
          refetch={refetch}
          loginUser={loginUser}
        />
      );
    } else if (data && loginUser?.settings.quoteTypeForHome === "appChoice") {
      return (
        <QuoteCard
          quote={data}
          type="appChoice"
          refetch={refetch}
          isPending={isPending}
          loginUser={loginUser}
        />
      );
    } else if (randomQuote) {
      return (
        <QuoteCard
          quote={randomQuote as TypeQuote}
          type="notAppChoice"
          refetch={refetch}
          loginUser={loginUser}
        />
      );
    }
  } else {
    return (
      <div className="mt-6 flex flex-col items-center p-12 py-16 sm:rounded-lg sm:shadow">
        <p>Login to create quotes</p>
        <GoogleLoginBtn />
      </div>
    );
    // }
  }
  return <div>Something wrong here</div>;
};

export default Quote;
