import React, { useEffect } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import AppChoice from "./Radio/appChoice/AppChoice";
import BookmarkRadioButton from "./Radio/bookmarks/BookmarkRadioButton";
import MineRadioBtn from "./Radio/mine/MineRadioBtn";

const Radios = () => {
  const { updateQuoteTypeForHome, loginUser, updateTagForQuotableApi } =
    useAuth();
  const { fetchMyBookmarks, myBookmarks, getLoginUserQuotes, loginUserQuotes } =
    useQuote();

  useEffect(() => {
    // if (!myBookmarks) {
    //   fetchMyBookmarks();
    // }
    if (!loginUserQuotes) getLoginUserQuotes();
  }, []);

  // todo
  if (loginUser?.settings.quoteTypeForHome) {
    return (
      <RadioGroup
        defaultValue={loginUser?.settings.quoteTypeForHome}
        className="grid grid-cols-1 gap-3 sm:gap-5 sm:py-2"
      >
        <MineRadioBtn
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
        />
      </RadioGroup>
    );
  } else return null;
};

export default Radios;
