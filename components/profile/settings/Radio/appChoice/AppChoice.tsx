"use client";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import TagList from "./TagList";
import { TypeLoginUser, TypeTagsQuotableAPI } from "@/types/type";
import { styleVariables } from "../../styles";

type Props = {
  updateQuoteTypeForHome: (text: string) => void;
  loginUser: TypeLoginUser;
  updateTagForQuotableApi: (text: string) => void;
  tags: TypeTagsQuotableAPI[];
};
const AppChoice = ({
  updateQuoteTypeForHome,
  loginUser,
  updateTagForQuotableApi,
  tags,
}: Props) => {
  return (
    <div
      className={`flex cursor-pointer flex-col items-start justify-start ${
        loginUser.settings.quoteTypeForHome === "appChoice"
          ? styleVariables.wrapper
          : null
      }`}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="appChoice"
          id="appChoice"
          className="border-gray-300 text-violet-600"
          onClick={(e) => updateQuoteTypeForHome("appChoice")}
        />
        <Label htmlFor="appChoice" className="text-md">
          App Choice
        </Label>
      </div>
      {loginUser.settings.quoteTypeForHome === "appChoice" ? (
        <TagList
          updateTagForQuotableApi={updateTagForQuotableApi}
          loginUser={loginUser}
          tags={tags}
        />
      ) : null}
    </div>
  );
};

export default AppChoice;
