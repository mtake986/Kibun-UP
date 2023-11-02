import React from "react";

const LoadingSpinnerM = () => {

  return (
    <div className="flex items-center justify-center h-40">
      <div
        className={`inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-current border-t-transparent text-slate-600`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinnerM;