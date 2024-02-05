import { useEvent } from "@/context/EventContext";
import { useQuote } from "@/context/QuoteContext";
import { ProfileTabs } from "@/types/type";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import { twMerge } from "tailwind-merge";

const Tabs = () => {
  const { profileUserQuotes } = useQuote();
  const { profileUserEvents } = useEvent();

  const tabs: ProfileTabs[] = [
    { name: "quotes", length: profileUserQuotes.length },
    { name: "events", length: profileUserEvents.length },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  const handleClick = (val: string) => {
    router.push(pathname + `?tab=${val}`);
  };

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
          onClick={() => handleClick(tab.name)}
        >
          {capitalizeFirstLetter(tab.name)}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
