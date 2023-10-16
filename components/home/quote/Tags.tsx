import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import React from "react";

type Props = {
  quote: TypeQuoteQuotetableAPI | TypeQuote;
};

const Tags = ({ quote }: Props) => {
  return (
    <ul className="flex flex-wrap items-center gap-1 text-[10px]">
      {quote
        ? "content" in quote
          ? quote.tags.map((tag, i) => (
              <Badge
                key={i}
                className={`whitespace-nowrap font-light hover:opacity-70 ${changeTagColor(
                  "gray"
                )}`}
              >
                #{tag}
              </Badge>
            ))
          : Object.keys(quote).includes("tags")
          ? quote.tags.map((tag, i) => (
              <Badge
                key={i}
                className={`font-light hover:opacity-70 ${changeTagColor(
                  tag.tagColor
                )}`}
              >
                #{tag.tag}
              </Badge>
            ))
          : null
        : null}
    </ul>
  );
};

export default Tags;
