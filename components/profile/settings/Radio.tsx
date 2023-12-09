import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TypeQuote, TypeUserFromFirestore } from "@/types/type";
import React from "react";
import TagList from "./TagList";

type Props = {
  radio: { id: string; label: string };
  updateQuoteTypeForHome: (text: string) => void;
  loginUser: TypeUserFromFirestore;
  loginUserQuotes: TypeQuote[];
};

const Radio = ({
  radio,
  updateQuoteTypeForHome,
  loginUser,
  loginUserQuotes,
}: Props) => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          checked={loginUser?.settings?.quoteTypeForHome === radio.id}
          value={radio.id}
          id={radio.id}
          className="border-gray-300 text-gray-600 dark:text-white"
          onClick={(e) => updateQuoteTypeForHome(radio.id)}
          disabled={!loginUserQuotes || loginUserQuotes.length === 0}
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
