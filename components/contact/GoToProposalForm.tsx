import React from 'react'
import UrlLink from "../utils/UrlLink";

const GoToProposalForm = () => {
  return (
    <p className="sm:text-md mt-5 text-center text-xs">
      Have an idea to make the service even better?{" "}
      <UrlLink
        className="text-sky-500 underline-offset-2 hover:underline"
        target="_self"
        href="/proposals"
        clickOn="Leave it here!!"
      />
    </p>
  );
}

export default GoToProposalForm