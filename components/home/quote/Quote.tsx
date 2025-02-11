import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import QuoteCard from "./QuoteCard";
import { createProperUrl } from "@/functions/createProperUrl";
import useFetchQuoteFromQuotableAPI from "@/components/hooks/useFetchQuoteFromQuotableAPI";
import LoadingIndicator from "../LoadingIndicator";
import { TypeAPIQuote, TypeQuote } from "@/types/type";

const Quote = () => {
  const { loginUser } = useAuth();

  const { randomQuote, lockedQuote } = useQuote();
  const { data, isPending, error, refetch } = useFetchQuoteFromQuotableAPI(
    createProperUrl(loginUser?.settings.tagForQuotableApi)
  );

  if (!loginUser) return <div>No Login User</div>;
  
  const renderQuoteCard = (
    quote: TypeQuote | TypeAPIQuote,
    type: "locked" | "appChoice" | "notAppChoice",
    refetch?: () => Promise<void>
  ) => (
    <QuoteCard
      quote={quote}
      type={type}
      refetch={refetch}
      loginUser={loginUser}
    />
  );

  if (lockedQuote) {
    return renderQuoteCard(lockedQuote, "locked");
  }

  if (isPending) {
    return <LoadingIndicator text={"Loading a Quote..."} />;
  }
  if (error) {
    return <div>Error</div>;
  }
  
  if (loginUser) {
    if (lockedQuote) {
      return renderQuoteCard(lockedQuote, "locked");
    } else if (data && loginUser.settings.quoteTypeForHome === "appChoice") {
      return renderQuoteCard(data, "appChoice", refetch);
    } else if (randomQuote) {
      return renderQuoteCard(randomQuote, "notAppChoice");
    }
  }

  return <div>Smoething wrong here</div>;
};

export default Quote;
