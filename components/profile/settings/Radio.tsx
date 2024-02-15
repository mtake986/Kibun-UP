import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TypeQuote, TypeQuoteTypeForHome, TypeUserFromFirestore } from "@/types/type";
import React, { useState } from "react";
import TagList from "./TagList";

type Props = {
  radio: { id: TypeQuoteTypeForHome; label: string };
  updateQuoteTypeForHome: (text: string) => void;
  loginUser: TypeUserFromFirestore;
  loginUserQuotes: TypeQuote[];
  quoteTypeForHome: TypeQuoteTypeForHome;
  setQuoteTypeForHome: React.Dispatch<React.SetStateAction<"bookmarks" | "mine" | "appChoice">>;

};

const Radio = ({
  radio,
  updateQuoteTypeForHome,
  loginUser,
  loginUserQuotes,
  quoteTypeForHome,
  setQuoteTypeForHome
}: Props) => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          checked={quoteTypeForHome === radio.id}
          value={radio.id}
          id={radio.id}
          className="border-gray-300 text-gray-600 dark:text-white"
          onClick={(e) => {
            setQuoteTypeForHome(radio.id)
            updateQuoteTypeForHome(radio.id);
          }}
        />
        <Label htmlFor={radio.id} className="text-md">
          {radio.label}
        </Label>
      </div>
      {radio.id === "appChoice" ? <TagList loginUser={loginUser} /> : null}
    </div>
  );
};

export default Radio;
