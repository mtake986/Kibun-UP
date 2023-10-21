import { useEvent } from "@/context/EventContext";
import { useQuote } from "@/context/QuoteContext";
import { TypeLoginUser, profileTabs } from "@/types/type";
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
  const tabs: profileTabs[] = [
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
          <span>{tab.length}</span>
        </span>
      ))}
    </div>
  );
};

export default Tabs;
