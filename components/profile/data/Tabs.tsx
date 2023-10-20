import { useQuote } from "@/context/QuoteContext";
import { profileTabs } from "@/types/type";
import React from "react";

const Tabs = () => {
  const { profileWhichTab, handleProfileWhichTab } = useQuote();
  const tabs: profileTabs[] = [
    { name: "quotes" },
    { name: "bookmarks" },
    { name: "likes" },
    { name: "events" },
  ];

  return (
    <div className="mb-1 flex items-stretch">
      {tabs.map((tab) => (
        <span
          key={tab.name}
          className={`w-full cursor-pointer py-1 text-center text-xs sm:text-sm ${
            profileWhichTab === tab.name
              ? "rounded-2xl bg-violet-50 text-violet-500"
              : ""
          }`}
          onClick={() => handleProfileWhichTab(tab.name)}
        >
          {tab.name}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
