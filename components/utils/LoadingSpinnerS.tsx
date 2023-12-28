import React from "react";

const LoadingSpinnerS = () => {
  return (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-[1px] border-current border-t-transparent text-gray-400"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinnerS;
