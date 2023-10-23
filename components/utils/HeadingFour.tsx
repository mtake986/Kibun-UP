import React from "react";
type Props = {
  text: string;
  className?: string;
};

const HeadingFour = (props: Props) => {
  return (
    <h4
      className={`dark:text-white text-center text-lg font-bold sm:text-xl ${props.className}`}
    >
      {props.text}
    </h4>
  );
};

export default HeadingFour;
