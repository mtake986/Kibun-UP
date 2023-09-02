import UrlLink from "@/components/utils/UrlLink";
import React from "react";

const ResumeJap = () => {
  return (
    <UrlLink
      href="/files/masahiro-takechi-resume-jap.pdf"
      target="_blank"
      clickOn="履歴書"
      className="text-xs text-sky-500 hover:underline sm:text-sm"
    />
  );
};

export default ResumeJap;
