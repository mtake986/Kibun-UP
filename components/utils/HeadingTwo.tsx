import React from "react";
type Props = {
  text: string;
  className?: string;
};

const HeadingTwo = (props: Props) => {
  return (
    <h2
      className={`text-center font-bold mb-4 text-3xl ${props.className}`}
    >
      {props.text}
    </h2>
  );
};

export default HeadingTwo;
