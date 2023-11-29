import { useEvent } from "@/context/EventContext";
import { useQuote } from "@/context/QuoteContext";
import { TypeLoginUser, ProfileTabs } from "@/types/type";
import React from "react";
import { useQuotesBookmarkedByLoginUser } from "@/components/hooks/useQuotesBookmarkedByLoginUser";
import { useQuotesLikedByLoginUser } from "@/components/hooks/useQuotesLikedByLoginUser";

type Props = {
  loginUser: TypeLoginUser;
};

const Tabs = ({ loginUser }: Props) => {
  const { profileWhichTab, handleProfileWhichTab, allQuotes, loginUserQuotes } =
    useQuote();
  const { loginUserEvents } = useEvent();

  const lengths = {
    bookmarks: useQuotesBookmarkedByLoginUser(allQuotes, loginUser).length,
    likes: useQuotesLikedByLoginUser(allQuotes, loginUser).length,
  };
  const tabs: ProfileTabs[] = [
    { name: "quotes", length: loginUserQuotes.length },
    {
      name: "bookmarks",
      length: lengths.bookmarks,
    },
    {
      name: "likes",
      length: lengths.likes,
    },  
    { name: "events", length: loginUserEvents.length },
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
