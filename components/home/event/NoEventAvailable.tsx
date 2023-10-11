import UrlLink from "@/components/utils/UrlLink";
import React from 'react'

const NoEventAvailable = () => {
  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-violet-50 p-12 text-center">
      <UrlLink
        href="/event"
        className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
        target="_self"
        clickOn="You have no events yet."
      />
    </div>
  );
}

export default NoEventAvailable