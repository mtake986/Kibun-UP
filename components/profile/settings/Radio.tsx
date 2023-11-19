import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TypeQuote, TypeLoginUser } from "@/types/type";
import React from "react";
import TagList from "./TagList";

type Props = {
  radio: { id: string; label: string };
  updateQuoteTypeForHome: (text: string) => void;
  loginUser: TypeLoginUser;
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
          value={radio.id}
          id={radio.id}
          className={`border-gray-300 text-gray-600 dark:text-white  `}
          onClick={(e) => updateQuoteTypeForHome(radio.id)}
          disabled={!loginUserQuotes}
        />
        <Label htmlFor={radio.id} className="text-md">
          {radio.label}
        </Label>
        {/* {loginUser.settings.quoteTypeForHome === radio.id &&
        !loginUserQuotes ? (
          <p className="ml-3 text-xs text-violet-500">No quotes available</p>
        ) : null} */}
      </div>
      {radio.id === "appChoice" ? <TagList loginUser={loginUser} /> : null}
    </div>
  );
};

export default Radio;
