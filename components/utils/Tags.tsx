import { ITag } from "@/types/type";
import React from 'react'
import { Badge } from "../ui/badge";
import { twMerge } from "tailwind-merge";
import { changeTagColor } from "@/functions/functions";

type Props = {
  tags: ITag[];
}
const Tags = ({tags} : Props) => {
  return (
    <div>
      {tags && tags?.length >= 1 && (
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
      )}
    </div>
  );
}

export default Tags