import React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";

const Radios = () => {

  const { updateDisplayWhichQuoteType, loginUser } = useAuth();

  return (
    <RadioGroup
      defaultValue={loginUser?.displayWhichQuoteType}
      className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 sm:py-2"
    >
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="mine"
            id="r1"
            onClick={(e) => updateDisplayWhichQuoteType("mine")}
          />
          <Label htmlFor="r1">Mine</Label>
        </div>
        <p className="mt-1 text-xs text-gray-500">Only from your quotes</p>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="bookmarks"
            id="r2"
            onClick={(e) => updateDisplayWhichQuoteType("bookmarks")}
          />
          <Label htmlFor="r2">Bookmarks</Label>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Display one only from your quotes
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="both"
            id="r3"
            onClick={(e) => updateDisplayWhichQuoteType("both")}
          />
          <Label htmlFor="r3">Both</Label>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Both of your quotes and bookmarks
        </p>
      </div>
    </RadioGroup>
  );
};

export default Radios;
