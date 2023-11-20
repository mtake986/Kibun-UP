import { fontMerriweather, fontRaleway } from "@/components/utils/fonts";
import { TypeQuote } from "@/types/type";
import React from "react";

type Props = {
  quote: TypeQuote;
};

const QuoteContent = ({ quote }: Props) => {
  return (
    <strong className={`text-lg sm:text-xl ${fontMerriweather.className}`}>
      {quote.content}
    </strong>
  );
};

export default QuoteContent;
