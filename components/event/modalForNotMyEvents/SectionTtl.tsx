
import React from 'react'

type Props = {
  text: string;
}
const SectionTtl = ({ text = "Default Title" }: Props) => {
  return (
    <div className="flex items-center gap-3 px-5">
      <div className="w-[50%] border-b border-slate-500"></div>
      <h6 className="text-center text-xl font-medium text-slate-500 mx-2">{text}</h6>
      <div className="w-[50%] border-b border-slate-500"></div>
    </div>
  );
};

export default SectionTtl