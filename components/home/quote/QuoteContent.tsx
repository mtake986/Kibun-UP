import { fontMerriweather } from "@/components/utils/fonts";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  content: string;
};

const QuoteContent = ({ content }: Props) => {
  return (
    <strong className={twMerge('text-lg sm:text-xl', fontMerriweather.className)}>
      {content}
    </strong>
  );
};

export default QuoteContent;
