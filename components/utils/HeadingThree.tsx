import React from "react";
type Props = {
  text: string;
  className?: string;
};

const HeadingThree = (props: Props) => {
  return (
    <h3
      className={`mb-3 text-center text-xl font-bold sm:text-2xl ${props.className}`}
    >
      {props.text}
    </h3>
  );
};

export default HeadingThree;
