import { useQuote } from "@/context/QuoteContext";
import React from "react";

const Tabs = () => {
  const { profileWhichTab, handleProfileWhichTab } = useQuote();
  return (
    <div className="mb-1 flex items-stretch">
      <span
        className={`w-full cursor-pointer py-1 text-center text-xs sm:text-sm ${
          profileWhichTab === "quotes"
            ? "rounded-2xl bg-violet-50 text-violet-500"
            : ""
        }`}
        onClick={() => handleProfileWhichTab("quotes")}
      >
        Quotes
      </span>
      <span
        className={`w-full cursor-pointer py-1 text-center text-xs sm:text-sm ${
          profileWhichTab === "bookmarks"
            ? "rounded-2xl bg-violet-50 text-violet-500"
            : ""
        }`}
        onClick={() => handleProfileWhichTab("bookmarks")}
      >
        Bookmarks
      </span>
      <span
        className={`w-full cursor-pointer py-1 text-center text-xs sm:text-sm ${
          profileWhichTab === "likes"
            ? "rounded-2xl bg-violet-50 text-violet-500"
            : ""
        }`}
        onClick={() => handleProfileWhichTab("likes")}
      >
        Likes
      </span>
      <span
        className={`w-full cursor-pointer py-1 text-center text-xs sm:text-sm ${
          profileWhichTab === "events"
            ? "rounded-2xl bg-violet-50 text-violet-500"
            : ""
        }`}
        onClick={() => handleProfileWhichTab("events")}
      >
        Events
      </span>
    </div>
  );
};

export default Tabs;
