
import UrlLink from "@/components/utils/UrlLink";
import React from "react";

const ResumeEng = () => {
  return (
    <UrlLink
      href="/files/masahiro-takechi-resume-eng.pdf"
      target="_blank"
      clickOn="Resume"
      className="text-sky-500 hover:underline sm:text-sm text-xs"
    />
  );
};

export default ResumeEng;
