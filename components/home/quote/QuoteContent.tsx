import { fontMerriweather, fontRaleway } from "@/components/utils/fonts";
import { TypeQuote } from "@/types/type";
import React from "react";

// const TypeQuote = (
//   props: unknown
// ): props is TypeQuote =>
//   Object.prototype.hasOwnProperty.call(props, "content");

type Props = {
  quote: TypeQuote;
};

const QuoteContent = ({ quote }: Props) => {
  return (
  // <strong className={`text-lg sm:text-xl ${fontRaleway.className}`}>
    <strong className={`text-lg sm:text-xl ${fontMerriweather.className}`}>
      {quote.content}
      {/* {TypeQuote(quote) ? quote.content : quote.content} */}
    </strong>
  );
};

export default QuoteContent;
