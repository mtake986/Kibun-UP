import { fontMerriweather, fontRaleway } from "@/components/utils/fonts";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import React from "react";

// const TypeQuoteQuotetableAPI = (
//   props: unknown
// ): props is TypeQuoteQuotetableAPI =>
//   Object.prototype.hasOwnProperty.call(props, "content");

type Props = {
  quote: TypeQuoteQuotetableAPI | TypeQuote;
};

const QuoteContent = ({ quote }: Props) => {
  return (
    // <strong className={`text-lg sm:text-xl ${fontRaleway.className}`}>
    <strong className={`text-lg sm:text-xl ${fontMerriweather.className}`}>
      {quote ? ("quote" in quote ? quote.quote : quote.content) : null}
      {/* {TypeQuoteQuotetableAPI(quote) ? quote.content : quote.quote} */}
    </strong>
  );
};

export default QuoteContent;
