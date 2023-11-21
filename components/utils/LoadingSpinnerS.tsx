import React from "react";

const LoadingSpinnerS = () => {
  return (
    <div className="flex items-center justify-center p-2">
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

export default LoadingSpinnerS;
