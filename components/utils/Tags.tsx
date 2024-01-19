import { ITag } from "@/types/type";
import React from "react";
import { Badge } from "../ui/badge";
import { twMerge } from "tailwind-merge";
import { changeTagColor } from "@/functions/functions";

type Props = {
  tags: ITag[];
};
const Tags = ({ tags }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag, i) => (
        <Badge
          key={tag.name}
          className={twMerge(
            "border-none font-light",
            changeTagColor(tag.color)
          )}
        >
          #{tag.name}
        </Badge>
      ))}
    </div>
  );
};

export default Tags;
