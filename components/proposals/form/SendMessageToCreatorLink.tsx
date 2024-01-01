import UrlLink from "@/components/utils/UrlLink";
import React from "react";

const SendMessageToCreatorLink = () => {
  return (
    <p className="sm:text-md mt-2 text-center text-xs">
      Wanna{" "}
      <UrlLink
        className="text-sky-500 underline-offset-2 hover:underline"
        target="_blank"
        href="/contact"
        clickOn="send a message"
      />{" "}
      to the creator?
    </p>
  );
};

export default SendMessageToCreatorLink;
