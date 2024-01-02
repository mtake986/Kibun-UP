import UrlLink from "@/components/utils/UrlLink";
import React from 'react'

const CreateAnIssueLink = () => {
  return (
    <p className="sm:text-md mt-5 text-center text-xs">
      For engineers, you can{" "}
      <UrlLink
        className="text-sky-500 underline-offset-2 hover:underline"
        target="_blank"
        href="https://github.com/mtake986/Kibun-UP/issues"
        clickOn="create an issue"
      />{" "}
      in GitHub.
    </p>
  );
}

export default CreateAnIssueLink