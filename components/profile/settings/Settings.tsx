import HeadingThree from "@/components/utils/HeadingThree";
import React from "react";
import Radios from "./Radios";

const Settings = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-5 sm:gap-10 justify-center">
        <div className="sm:w-20 w-10 border border-b-[1px] border-black"></div>
        <HeadingThree text="Settings" />
        <div className="sm:w-20 w-10 border border-b-[1px] border-black"></div>
      </div>
      <Radios />
    </div>
  );
};

export default Settings;
