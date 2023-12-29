import React from "react";
import { twMerge } from "tailwind-merge";
type Props = {
  text: string;
  className?: string;
};

const HeadingTwo = (props: Props) => {
  return (
    <h2
      className={twMerge(
        "mb-4 text-center text-3xl font-bold",
        props.className
      )}
    >
      {props.text}
    </h2>
  );
};

export default HeadingTwo;
