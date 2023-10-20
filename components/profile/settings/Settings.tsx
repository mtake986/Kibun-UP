
import React from "react";
import Radios from "./Radios";
import RadioCaption from "./RadioCaption";
import SectionTitle from "../SectionTitle";

const Settings = () => {
  return (
    <div className="mt-10">
      <SectionTitle title="Settings" />
      <div className="flex flex-col gap-3">
        <RadioCaption />
        <Radios />
      </div>
    </div>
  );
};

export default Settings;
