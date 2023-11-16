import React from "react";

type Props = {
  text: string;
};
const SectionSubTtl = ({ text = "Default Title" }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <h6 className="text-center text-base font-medium mb-1 text-slate-500">
        {text}
      </h6>
    </div>
  );
};

export default SectionSubTtl;
