import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { TypeQuote, TypeLoginUser } from "@/types/type";
import React from "react";
import { styleVariables } from "../../styles";

type Props = {
  updateQuoteTypeForHome: (text: string) => void;
  loginUser: TypeLoginUser;
  loginUserQuotes: TypeQuote[];
};
const MineRadioBtn = ({
  updateQuoteTypeForHome,
  loginUser,
  loginUserQuotes,
}: Props) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center ${
        loginUser.settings.quoteTypeForHome === "mine"
          ? styleVariables.wrapper
          : null
      }`}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="mine"
          id="mine"
          className="border-gray-300 text-violet-600"
          onClick={(e) => updateQuoteTypeForHome("mine")}
          disabled={!loginUserQuotes}
        />
        <Label htmlFor="mine" className="text-md">
          Mine
        </Label>
        {!loginUserQuotes ? (
          <p className="ml-3 text-xs text-violet-500">No quotes available</p>
        ) : null}
      </div>
    </div>
  );
};

export default MineRadioBtn;
