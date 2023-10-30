import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import { cn } from "@/lib/utils";
import { TypeQuote } from "@/types/type";
import React from "react";

type Props = {
  quote: TypeQuote;
};

const Tags = ({ quote }: Props) => {
  return (
    <ul className="flex flex-wrap items-center gap-1 text-[10px]">
      {quote.tags?.map((tag, i) => (
        <Badge
          key={i}
          className={cn(
            `whitespace-nowrap font-light hover:opacity-70`,
            changeTagColor(tag.color)
          )}
        >
          #{tag.name}
        </Badge>
      ))}
    </ul>
  );
};

export default Tags;
