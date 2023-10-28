import React from "react";

type Props = {
  scale: number;
};
const LoadingSpinner = ({ scale }: Props) => {
  const scaleOfClassName = () => {
    return `w-${scale} h-${scale}`;
  };
  return (
    <div className="flex items-center justify-center h-40">
      <div
        className={`inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-slate-600`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
