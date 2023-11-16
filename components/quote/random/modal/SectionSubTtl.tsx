import React from "react";

type Props = {
  text: string;
};
const SectionSubTtl = ({ text = "Default Title" }: Props) => {
  return (
    <h6 className="mb-1 text-left text-base font-medium text-slate-500">
      {text}
    </h6>
  );
};

export default SectionSubTtl;
