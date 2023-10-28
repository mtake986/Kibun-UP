import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import useFetchTags from "@/components/hooks/useFetchTags";
import Radio from "./Radio";

const radios = [
  {
    id: "mine",
  },
  {
    id: "bookmarks",
  },
  {
    id: "appChoice",
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
        {/* <MineRadioBtn
          updateQuoteTypeForHome={updateQuoteTypeForHome}
          loginUser={loginUser}
          loginUserQuotes={loginUserQuotes}
        />

        <BookmarkRadioButton
          updateQuoteTypeForHome={updateQuoteTypeForHome}
          loginUser={loginUser}
        />
        <AppChoice
          updateQuoteTypeForHome={updateQuoteTypeForHome}
          loginUser={loginUser}
          updateTagForQuotableApi={updateTagForQuotableApi}
          tags={tags}
        /> */}
      </RadioGroup>
    );
  } else return null;
};

export default Radios;
