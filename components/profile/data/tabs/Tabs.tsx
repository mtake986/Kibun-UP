import { useEvent } from "@/context/EventContext";
import { useQuote } from "@/context/QuoteContext";
import { ProfileTabs } from "@/types/type";
import React, { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import { twMerge } from "tailwind-merge";

type Props = {
  currTab: "quotes" | "events";
  setCurrTab: Dispatch<SetStateAction<"quotes" | "events">>;
};

const Tabs = ({currTab, setCurrTab}: Props) => {
  const { profileUserQuotes } = useQuote();
  const { profileUserEvents } = useEvent();

  const tabs: ProfileTabs[] = [
    { name: "quotes", length: profileUserQuotes.length },
    { name: "events", length: profileUserEvents.length },
  ];

  return (
    <div className="flex items-stretch">
      {tabs.map((tab) => (
        <span
          key={tab.name}
          className={twMerge(
            "w-full cursor-pointer py-1 text-center text-xs",
            currTab === tab.name || (currTab === null && tab.name === "quotes")
              ? "rounded-2xl bg-violet-50 text-violet-500 dark:bg-slate-900 dark:text-white"
              : ""
          )}
          onClick={() => {
            if (tab.name === 'quotes') setCurrTab(tab.name)
            else if (tab.name === 'events') setCurrTab(tab.name)
          }}
          // onClick={() => handleClick(tab.name)}
        >
          {capitalizeFirstLetter(tab.name)}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
