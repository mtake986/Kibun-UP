"use client";

import { useQuote } from "@/app/context/QuoteContext";
import { useEffect } from "react";

const QuoteAllPage = () => {
  const {allQuotes, getAllQuotes} = useQuote()
  useEffect(() => {
    getAllQuotes()
  }, [])

  return (
    <div>
      {allQuotes.map((quote, i) => (
        <div key={i}>
          <h2>{quote.person}</h2>
          <p>{quote.quote}</p>
          </div>
      ))}
    </div>
  );
};

export default QuoteAllPage;
