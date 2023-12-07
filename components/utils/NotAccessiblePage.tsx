import React from 'react'
import UrlLink from "./UrlLink"

const NotAccessiblePage = () => {
  return (
    <div>
      <p role="alert">You do not have access to this page.</p>
      <UrlLink
        className="text-xs text-sky-500 underline-offset-2 hover:underline sm:text-sm"
        target="_self"
        href="/home"
        clickOn={<p>Go to home page</p>}
      />
    </div>
  );
}

export default NotAccessiblePage