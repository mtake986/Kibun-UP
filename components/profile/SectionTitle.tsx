import React from "react";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="mb-5 flex items-center justify-center gap-5 sm:gap-10">
      <div className="w-5 border border-b-[1px] border-black dark:border-white sm:w-20"></div>
      <h3 className="mb-0 font-serif text-3xl drop-shadow-lg">{title}</h3>
      <div className="w-5 border border-b-[1px] border-black dark:border-white sm:w-20"></div>
    </div>
  );
};

export default SectionTitle;
