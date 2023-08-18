import React from "react";
type Props = {
  text: string;
  className?: string;
};

const HeadingThree = (props: Props) => {
  return (
    <h2 className={`my-4 text-center text-2xl font-bold ${props.className}`}>
      {props.text}
    </h2>
  );
};

export default HeadingThree;
