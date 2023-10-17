import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TypeLoginUser } from "@/types/type";
import React from "react";
import { styleVariables } from "../../styles";
import { useQuote } from "@/context/QuoteContext";

type Props = {
  updateQuoteTypeForHome: (text: string) => void;
  loginUser: TypeLoginUser;
};
const BookmarkRadioButton = ({ updateQuoteTypeForHome, loginUser }: Props) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center ${
        loginUser.settings.quoteTypeForHome === "bookmarks"
          ? styleVariables.wrapper
          : null
      }`}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="bookmarks"
          id="bookmarks"
          className="border-gray-300 text-violet-600"
          onClick={(e) => updateQuoteTypeForHome("bookmarks")}
        />
        <Label htmlFor="bookmarks" className="text-md">
          Bookmarks
        </Label>
      </div>
      {/* {!myBookmarks ? <p className="text-xs text-violet-500">No bookmarks available</p> : null} */}
    </div>
  );
};

export default BookmarkRadioButton;
