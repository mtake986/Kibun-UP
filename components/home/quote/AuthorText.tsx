import {
  fontMerriweather,
} from "@/components/utils/fonts";
import React from "react";

type Props = {
  author: string;
};
const AuthorText = ({ author }: Props) => {
  return (
    <div>
      <span className="text-xs">by </span>
      <span className={`text-sm ${fontMerriweather.className}`}>
        {author}
      </span>
    </div>
  );
};

export default AuthorText;
