import { fontRaleway } from "@/components/utils/fonts";
import { IQuote } from "@/types/type";
import React from 'react'

type Props = {
  quote: IQuote
}

const QuoteContent = ({quote}: Props) => {
  return (
    <strong className={`text-lg sm:text-xl ${fontRaleway.className}`}>
      {quote?.quote}
    </strong>
  );
}

export default QuoteContent