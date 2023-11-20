import { fontMerriweather, fontRaleway } from "@/components/utils/fonts";
import { TypeAPIQuote, TypeQuote } from "@/types/type";
import React from "react";

type Props = {
  content: string;
};

const QuoteContent = ({ content }: Props) => {
  return (
    <strong className={`text-lg sm:text-xl ${fontMerriweather.className}`}>
      {content}
    </strong>
  );
};

export default QuoteContent;
