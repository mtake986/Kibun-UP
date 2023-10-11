import React from "react";
import QuoteContent from "./QuoteContent";
import { IQuote } from "@/types/type";
import AuthorText from "./AuthorText";
import Icons from "./Icons";

type Props = {
  quote: IQuote;
  type: "locked" | "appChoice" | "notAppChoice";
};
const QuoteCard = ({ quote, type }: Props) => {
  console.log(quote, type);
  return (
    <div className="mb-20 px-5 py-6 sm:rounded-lg sm:px-12 sm:pb-12 sm:pt-6 sm:shadow">
      <QuoteContent quote={quote} />
      <div className="mt-5 flex items-center justify-between text-right text-xs">
        <AuthorText quote={quote} />
        <Icons quote={quote} type={type} />
      </div>
    </div>
  );
};

export default QuoteCard;
