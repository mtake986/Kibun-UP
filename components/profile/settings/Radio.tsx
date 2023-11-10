import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TypeQuote, TypeLoginUser, TypeTagsQuotableAPI } from "@/types/type";
import React from "react";
import { styleVariables } from "./styles";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import useFetchTags from "@/components/hooks/useFetchTags";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
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
    <div className="">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={radio.id}
          id={radio.id}
          className={`text-gray-600 border-gray-300 dark:text-white  `}
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
