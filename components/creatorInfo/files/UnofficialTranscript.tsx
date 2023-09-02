import UrlLink from "@/components/utils/UrlLink";
import React from "react";

const UnofficialTranscript = () => {
  return (
    <UrlLink
      href="/files/unofficial_transcript.pdf"
      target="_blank"
      clickOn="Unofficial Transcript (成績証明書)"
      className="text-xs text-sky-500 hover:underline sm:text-sm"
    />
  );
};

export default UnofficialTranscript;
