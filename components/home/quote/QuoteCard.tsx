import React, { useEffect } from "react";
import QuoteContent from "./QuoteContent";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import AuthorText from "./AuthorText";
import Icons from "./Icons";
import Tags from "./Tags";
import Loading from "@/components/utils/Loading";
import { Skeleton } from "@mui/material";

type Props = {
  quote: TypeQuoteQuotetableAPI | TypeQuote;
  type: "locked" | "appChoice" | "notAppChoice";
  refetch?: () => void;
  isPending?: boolean;
};
const QuoteCard = ({ quote, type, refetch, isPending }: Props) => {
  return (
    <div className="mb-20 p-6 sm:rounded-lg sm:p-12 sm:shadow">
      <QuoteContent quote={quote} />
      <AuthorText quote={quote} />
      <div className="flex items-start justify-between mt-3">
        <Tags quote={quote} />
        <Icons quote={quote} type={type} refetch={refetch} />
      </div>
    </div>
  );
};

export default QuoteCard;
