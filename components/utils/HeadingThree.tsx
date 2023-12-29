import React from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  text: string;
  className?: string;
};

const HeadingThree = (props: Props) => {
  return (
    <h3
      className={twMerge(
        "mb-3 text-center text-xl font-bold sm:text-2xl",
        props.className
      )}
    >
      {props.text}
    </h3>
  );
};

export default HeadingThree;
