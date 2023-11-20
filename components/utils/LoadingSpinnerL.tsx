import React from "react";

const LoadingSpinnerL = () => {
  return (
    <div className="flex h-20 items-center justify-center">
      <div
        className={`inline-block h-12 w-12 animate-spin rounded-full border-[3px] border-current border-t-transparent text-slate-600`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinnerL;
