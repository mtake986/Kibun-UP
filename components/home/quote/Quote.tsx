"use client";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import QuoteCard from "./QuoteCard";
import { createProperUrl } from "@/functions/createProperUrl";
import useFetchQuoteFromQuotableAPI from "@/components/hooks/useFetchQuoteFromQuotableAPI";
import LoadingIndicator from "../LoadingIndicator";

const Quote = () => {
  const { loginUser } = useAuth();

  const { randomQuote, lockedQuote } = useQuote();
  const { data, isPending, error, refetch } = useFetchQuoteFromQuotableAPI(
    createProperUrl(loginUser?.settings.tagForQuotableApi)
  );

  if (isPending) {
    return <LoadingIndicator text={"Loading a Quote..."} />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loginUser) {
    if (lockedQuote) {
      return (
        <QuoteCard quote={lockedQuote} type="locked" loginUser={loginUser} />
      );
    } else if (data && loginUser.settings.quoteTypeForHome === "appChoice") {
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
          quote={randomQuote}
          type="notAppChoice"
          loginUser={loginUser}
        />
      );
    }
  }

  return <div>No quotes available</div>;
};

export default Quote;
