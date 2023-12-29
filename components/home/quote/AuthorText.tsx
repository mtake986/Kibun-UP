import {
  fontMerriweather,
} from "@/components/utils/fonts";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  author: string;
};
const AuthorText = ({ author }: Props) => {
  return (
    <div>
      <span className="text-xs">by </span>
      <span className={twMerge('text-sm', fontMerriweather.className)}>
        {author}
      </span>
    </div>
  );
};

export default AuthorText;
