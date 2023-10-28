import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TypeQuote, TypeLoginUser } from "@/types/type";
import React from "react";
import { styleVariables } from "./styles";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";

type Props = {
  radio: {id: string},
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
      <div
        className={`${styleVariables.wrapper.default} ${
          loginUser.settings.quoteTypeForHome === radio.id
            ? styleVariables.wrapper.chosen
            : null
        }`}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={radio.id}
            id={radio.id}
            className="border-gray-300 text-violet-600 dark:border-violet-500"
            onClick={(e) => updateQuoteTypeForHome(radio.id)}
            disabled={!loginUserQuotes}
          />
          <Label htmlFor={radio.id} className="text-md">
            {capitalizeFirstLetter(radio.id)}
          </Label>
          {loginUser.settings.quoteTypeForHome === radio.id &&
          !loginUserQuotes ? (
            <p className="ml-3 text-xs text-violet-500">No quotes available</p>
          ) : null}
        </div>
      </div>
    );

};

export default Radio;
