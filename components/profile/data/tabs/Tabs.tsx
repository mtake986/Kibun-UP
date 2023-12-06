import { useEvent } from "@/context/EventContext";
import { useQuote } from "@/context/QuoteContext";
import { ProfileTabs } from "@/types/type";
import React from "react";

const Tabs = () => {
  const { profileWhichTab, handleProfileWhichTab, profileUserQuotes } =
    useQuote();
  const {profileUserEvents} = useEvent();

  const tabs: ProfileTabs[] = [
    { name: "quotes", length: profileUserQuotes.length },
    { name: "events", length: profileUserEvents.length },
  ];

  return (
    <div className="mb-3 flex items-stretch">
      {tabs.map((tab) => (
        <span
          key={tab.name}
          className={`w-full cursor-pointer py-1 text-center text-[10px] sm:text-sm ${
            profileWhichTab === tab.name
              ? "rounded-2xl bg-violet-50 text-violet-500 dark:bg-slate-900 dark:text-white"
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
