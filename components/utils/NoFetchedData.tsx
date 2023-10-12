import React from "react";

type Props = {
  text: string;
};
const NoFetchedData = ({ text }: Props) => {
  return (
    <div className="mt-10">
      <p>{text}</p>
    </div>
  );
};

export default NoFetchedData;
