import {
  fontDancingScript,
  fontMerriweather,
  fontRaleway,
  fontRoboto,
} from "@/components/utils/fonts";
import { TypeQuote } from "@/types/type";
import React from "react";

type Props = {
  quote: TypeQuote;
};
const AuthorText = ({ quote }: Props) => {
  return (
    <div>
      <span className="text-xs">by </span>
      <span className={`text-sm ${fontMerriweather.className}`}>
        {quote.author}
      </span>
    </div>
  );
};

export default AuthorText;
