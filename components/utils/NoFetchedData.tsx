import React from "react";

type Props = {
  title: string;
  text: string;
};

const NoFetchedData = ({ title, text }: Props) => {
  return (
    <div className="flex h-48 flex-col items-center justify-center sm:h-96">
      <h1 className="font-serif  text-2xl">{title}</h1>
      <p className="text-sm text-gray-400 sm:text-base">{text}</p>
    </div>
  );
};

export default NoFetchedData;
