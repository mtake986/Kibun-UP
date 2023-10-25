import UrlLink from "@/components/utils/UrlLink";
import React from "react";

const ResumeEng = () => {
  return (
    <UrlLink
      href="/files/masahiro-takechi-resume-eng.pdf"
      target="_blank"
      clickOn="Resume"
      className="text-xs text-sky-500 underline-offset-2 hover:underline sm:text-sm"
    />
  );
};

export default ResumeEng;
