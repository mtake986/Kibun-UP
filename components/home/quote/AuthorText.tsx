import {
  fontDancingScript,
  fontMerriweather,
  fontRaleway,
  fontRoboto,
} from "@/components/utils/fonts";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import React from "react";

type Props = {
  quote: TypeQuoteQuotetableAPI | TypeQuote;
};
const AuthorText = ({ quote }: Props) => {
  return (
    <div>
      <span className="text-xs">by </span>
      <span className={`text-sm ${fontMerriweather.className}`}>
        {quote ? ("person" in quote ? quote.person : quote.author) : null}
      </span>
    </div>
  );
};

export default AuthorText;
