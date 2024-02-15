import React from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  text: string;
  className?: string;
};

const HeadingFour = (props: Props) => {
  return (
    <h4
      className={twMerge(
        "text-center text-lg font-bold dark:text-white sm:text-xl",
        props.className
      )}
    >
      {props.text}
    </h4>
  );
};

export default HeadingFour;
