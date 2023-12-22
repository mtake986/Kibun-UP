import React from 'react'
import LoadingSpinnerXS from "./LoadingSpinnerXS";
import LoadingSpinnerS from "./LoadingSpinnerS";
import LoadingSpinnerM from "./LoadingSpinnerM";
import LoadingSpinnerL from "./LoadingSpinnerL";

type Props = {
  spinnerSize: 's' | 'm' | 'l';
}

const spinners = {
  s: <LoadingSpinnerS />,
  m: <LoadingSpinnerM />,
  l: <LoadingSpinnerL />,
};

const LoadingCover = ({ spinnerSize }: Props) => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-slate-50 bg-opacity-50 dark:bg-black">
      <div className="h-10 w-10">
        {spinnerSize ? spinners[spinnerSize] : <LoadingSpinnerS />}
      </div>
    </div>
  );
};

export default LoadingCover