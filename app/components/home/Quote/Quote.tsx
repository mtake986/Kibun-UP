import React from "react";
import { builtInQuotes } from "../../../../public/CONSTANTS";

const Quote = () => {
  return (
    <div className="p-12 mt-6">
      <strong className="text-xl">{builtInQuotes[0].quote}</strong>
      <div className="text-right mt-4">
        <span>- {builtInQuotes[0].person}</span>
      </div>
    </div>
  );
};

export default Quote;
