import React from "react";
import QuoteContent from "./QuoteContent";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import AuthorText from "./AuthorText";
import Icons from "./Icons";
import Tags from "./Tags";

type Props = {
  quote: TypeQuoteQuotetableAPI | TypeQuote;
  type: "locked" | "appChoice" | "notAppChoice";
};
const QuoteCard = ({ quote, type }: Props) => {
  console.log(quote, type);
  return (
    <div className="mb-20 px-5 py-6 sm:rounded-lg sm:px-12 sm:pb-12 sm:pt-6 sm:shadow">
      <QuoteContent quote={quote} />
      <div className="mt-5 flex items-center justify-between text-right text-xs">
        <div className="flex flex-col items-start gap-1">
          <AuthorText quote={quote} />
          <Tags quote={quote} />
        </div>
        <Icons quote={quote} type={type} />
      </div>
    </div>
  );
};

export default QuoteCard;
