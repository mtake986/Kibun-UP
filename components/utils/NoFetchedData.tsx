import React from "react";
import HeadingThree from "./HeadingThree";

type Props = {
  text: string;
};
const NoFetchedData = ({ text }: Props) => {
  return (
    <div className="mt-10">
      <HeadingThree text={text} />
    </div>
  );
};

export default NoFetchedData;
