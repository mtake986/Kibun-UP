import React from "react";
import ResumeEng from "./ResumeEng";
import ResumeJap from "./ResumeJap";
import UnofficialTranscript from "./UnofficialTranscript";
import HeadingFive from "@/components/utils/HeadingFive";

const Files = () => {
  return (
    <div>
      <HeadingFive text="Files" className="text-violet-500 mb-1" />
      <div className="flex flex-col items-center gap-1">
        <ResumeEng />
        <ResumeJap />
        <UnofficialTranscript />
      </div>
    </div>
  );
};

export default Files;
