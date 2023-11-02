import React from 'react'
import LoadingSpinnerL from "../utils/LoadingSpinnerL";

type Props = {
  text: string
}

const LoadingIndicator = ({ text }: Props) => {
  return (
    <div className="flex flex-col items-center px-8 py-12">
      <LoadingSpinnerL />
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
};

export default LoadingIndicator;