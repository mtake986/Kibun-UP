import React from "react";

type Props = {
  title: string;
  text: string;
};

const NoData = ({ title, text }: Props) => {
  return (
    <div className="flex sm:h-96 h-48 flex-col items-center justify-center">
      <h1 className="font-serif  text-2xl">{title}</h1>
      <p className="text-gray-400 sm:text-base text-sm">{text}</p>
    </div>
  );
};

export default NoData;
