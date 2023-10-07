import HeadingThree from "@/components/utils/HeadingThree";
import React from "react";
import Radios from "./Radios";
import RadioTitle from "./RadioTitle";

const Settings = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-5 sm:gap-10">
        <div className="w-10 border border-b-[1px] border-black sm:w-20"></div>
        <HeadingThree text="Settings" />
        <div className="w-10 border border-b-[1px] border-black sm:w-20"></div>
      </div>
      <div>
        <RadioTitle />
        <Radios />
      </div>
    </div>
  );
};

export default Settings;
