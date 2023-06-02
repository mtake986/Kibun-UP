import React from "react";
import { builtInQuotes } from "../../../public/CONSTANTS";

const Quote = () => {
  return (
    <div className="mt-6 p-12">
      <strong className="text-xl">{builtInQuotes[0].quote}</strong>
      <div className="mt-4 text-right">
        <span>- {builtInQuotes[0].person}</span>
      </div>
    </div>
  );
};

export default Quote;
