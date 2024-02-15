import React from "react";

type Props = {
  num: number;
};

const LoadingSpinnerXS = ({num}: Props) => {

  const makeWidthHeight = (num: number) => {
    return `w-${num} h-${num}`;
  }

  const cls = `inline-block ${makeWidthHeight(num) ?? 'w-3 h-3'} animate-spin rounded-full border-[1px] border-current border-t-transparent text-gray-400`

  return (
    <div
      className={cls}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinnerXS;
