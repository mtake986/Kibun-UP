import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import useFetchTags from "@/components/hooks/useFetchTags";
import Radio from "./Radio";

const radios = [
  {
    id: "mine",
    label: "Mine",
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
  },
  {
    id: "appChoice",
    label: "App Choice",
  },
];

const Radios = () => {
  const { updateQuoteTypeForHome, loginUser, updateTagForQuotableApi } =
    useAuth();
  const { getLoginUserQuotes, loginUserQuotes } = useQuote();

  const { tags, error, isPending } = useFetchTags(
    "https://api.quotable.io/tags"
  );

  useEffect(() => {
    if (!loginUserQuotes) getLoginUserQuotes();
  }, [loginUserQuotes]);

  if (isPending) {
    return <div>{tags.length} Loading...</div>;
  }

  if (loginUser) {
    return (
      <RadioGroup
        defaultValue={loginUser.settings.quoteTypeForHome}
        className="grid grid-cols-1 gap-3 sm:gap-5 sm:py-2"
      >
        {radios.map((radio) => (
          <Radio
            key={radio.id}
            radio={radio}
            updateQuoteTypeForHome={updateQuoteTypeForHome}
            loginUser={loginUser}
            loginUserQuotes={loginUserQuotes}
          />
        ))}
      </RadioGroup>
    );
  } else return null;
};

export default Radios;
