
import React from 'react'

type Props = {
  text: string;
}
const SectionTtl = ({ text = "Default Title" }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-full border-b border-slate-300"></div>
      <h6 className="text-center text-xl font-medium text-slate-500">{text}</h6>
      <div className="w-full border-b border-slate-300"></div>
    </div>
  );
};

export default SectionTtl