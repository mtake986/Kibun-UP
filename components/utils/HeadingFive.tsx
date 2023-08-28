import React from "react";
type Props = {
  text: string;
  className?: string;
};

const HeadingFive = (props: Props) => {
  return (
    <h5
      className={`text-center text-md font-bold sm:text-lg ${props.className}`}
    >
      {props.text}
    </h5>
  );
};

export default HeadingFive;
