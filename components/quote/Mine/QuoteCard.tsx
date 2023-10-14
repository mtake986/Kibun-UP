"use client";
import { TypeQuote } from "@/types/type";
import EditModeOn from "./card/EditModeOn";
import Icons from "./card/Icons";
import Content from "./card/Content";
import { useState } from "react";

type Props = {
  q: TypeQuote;
  i: number;
};

const QuoteCard = ({ q, i }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  return (
    <div className="mb-3 rounded-sm border p-4 sm:p-6">
      {isUpdateMode ? (
        <EditModeOn q={q} setIsUpdateMode={setIsUpdateMode} />
      ) : (
        <Content q={q} />
      )}
      <Icons
        q={q}
        setIsUpdateMode={setIsUpdateMode}
      />
    </div>
  );
};

export default QuoteCard;
