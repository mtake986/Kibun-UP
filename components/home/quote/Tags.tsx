import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import React from "react";

type Props = {
  quote: TypeQuoteQuotetableAPI | TypeQuote;
};

const Tags = ({ quote }: Props) => {
  return (
    <ul className="flex gap-2 items-center">
      {quote
        ? "content" in quote
          ? quote.tags.map((tag, i) => (
              <Badge
                key={i}
                className={`p-0 bg-white hover:bg-white text-neutral-900 hover:opacity-70} border-none font-light`}
              >
                #{tag}
              </Badge>
            ))
          : Object.keys(quote).includes("tags")
          ? quote.tags.map((tag, i) => (
              <Badge
                key={i}
                className={`p-0 border-none font-light hover:opacity-70 ${changeTagColor(
                  tag.tagColor
                )}`}
              >
                #{tag.tag}
              </Badge>
            ))
          : "none"
        : "no quote"}
    </ul>
  );
};

export default Tags;
