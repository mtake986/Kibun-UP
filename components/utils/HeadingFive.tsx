import React from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  text: string;
  className?: string;
};

const HeadingFive = (props: Props) => {
  return (
    <h5
      className={twMerge(
        "text-md text-center font-bold sm:text-lg",
        props.className
      )}
    >
      {props.text}
    </h5>
  );
};

export default HeadingFive;
