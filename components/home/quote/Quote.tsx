"use client";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import QuoteCard from "./QuoteCard";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { createProperUrl } from "@/functions/createProperUrl";
import useFetchQuoteFromQuotableAPI from "@/components/hooks/useFetchQuoteFromQuotableAPI";
import { useEffect, useState } from "react";
import { auth } from "@/config/Firebase";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingIndicator from "../LoadingIndicator";

const Quote = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { loginUser, fetchLoginUser } = useAuth();

  const { randomQuote, lockedQuote, updateRandomQuote, getLockedQuote } =
    useQuote();
  const { data, isPending, error, refetch } = useFetchQuoteFromQuotableAPI(
    createProperUrl(loginUser?.settings.tagForQuotableApi)
  );

  useEffect(() => {
    const fetchQuotes = async () => {
      getLockedQuote();
      updateRandomQuote();
    };

    setIsLoading(true);
    try {
      fetchQuotes();
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, []);

  if (isLoading || isPending) {
    return <LoadingIndicator text={"Loading a Quote..."} />;
  }
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
    } else if (data && loginUser.settings.quoteTypeForHome === "appChoice") {
      console.log("randomequote", data);
      return (
        <QuoteCard
          quote={data}
          type="appChoice"
          refetch={refetch}
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
  }
  return <div>Something wrong here</div>;
};

export default Quote;
