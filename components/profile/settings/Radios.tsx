import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";

const Radios = () => {
  const { updateDisplayWhichQuoteType, loginUser } = useAuth();
  const {
    fetchQuotesForHomePage,
    updateRandomQuote,
    randomQuote,
    quotesForHomePage,
  } = useQuote();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (loginUser?.displayWhichQuoteType) {
    return (
      <RadioGroup
        defaultValue={loginUser?.displayWhichQuoteType}
        className="grid grid-cols-1 gap-3 sm:gap-5 sm:py-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="mine"
              id="r1"
              className="border-gray-300 text-violet-600"
              onClick={(e) => updateDisplayWhichQuoteType("mine")}
            />
            <Label htmlFor="r1">Mine</Label>
            <p className="ml-3 text-xs text-gray-500">Only from your quotes</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="bookmarks"
              id="r2"
              className="border-gray-300 text-violet-600"
              onClick={(e) => updateDisplayWhichQuoteType("bookmarks")}
            />
            <Label htmlFor="r2">Bookmarks</Label>
            <p className="ml-3 text-xs text-gray-500">Only from bookmarks</p>
          </div>
        </div>
        {/* <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="both"
              id="r3"
              className="border-gray-300 text-violet-600"
              onClick={(e) => updateDisplayWhichQuoteType("both")}
            />
            <Label htmlFor="r3">Both</Label>
          </div>
        </div> */}
      </RadioGroup>
    );
  } else return null;
};

export default Radios;
