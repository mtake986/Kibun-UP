
import React from "react";
import Radios from "./Radios";
import RadioCaption from "./RadioCaption";
import HeadingTwo from "@/components/utils/HeadingTwo";

const Settings = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center mb-5 gap-5 sm:gap-10">
        <div className="w-5 border border-b-[1px] border-black sm:w-20"></div>
        <h3 className="font-serif drop-shadow-lg mb-0 text-3xl">Settings</h3>
        <div className="w-5 border border-b-[1px] border-black sm:w-20"></div>
      </div>
      <div className="flex flex-col gap-3">
        <RadioCaption />
        <Radios />
      </div>
    </div>
  );
};

export default Settings;
