import { auth } from "@/config/Firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuote } from "@/context/QuoteContext";
import QuoteList from "./quote/QuoteList";
import EventList from "./event/EventList";
import Loading from "@/components/utils/Loading";
import NoFetchedData from "@/components/utils/NoFetchedData";
import ListOfBookmarks from "./bookmarks/ListOfBookmarks";
import HeadingTwo from "@/components/utils/HeadingTwo";
import MobileSortFilterForQuotesOpenBtn from "./quote/MobileSortFilterForQuotesOpenBtn";

const ContentSwitchTabs = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    getLockedQuote,
    fetchFavQuotes,
    getLoginUserQuotes,
    loginUserQuotes,
    fetchMyBookmarks,
    fetchNumOfBookmarks,
    myBookmarks,

    profileWhichTab,
    handleProfileWhichTab,
    isSortFilterAreaForProfileQuotesShown,
    toggleSortFilterAreaForProfileQuotes,
  } = useQuote();

  useEffect(() => {
    setLoading(true);
    getLoginUserQuotes();
    getLockedQuote(user?.uid);
    fetchFavQuotes();
    fetchMyBookmarks();
    fetchNumOfBookmarks();
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative mt-10">
      <HeadingTwo text="Your Data" />
      {/* <span className="absolute top-0 right-0 text-xs text-gray-400">
          {user?.displayName}
        </span> */}

      {profileWhichTab === "quotes" ? (
        <MobileSortFilterForQuotesOpenBtn />
      ) : null}

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
          className={`cursor-pointer w-full py-1 text-center text-xs sm:text-sm ${
            profileWhichTab === "events"
              ? "rounded-2xl bg-violet-50 text-violet-500"
              : ""
          }`}
          onClick={() => handleProfileWhichTab("events")}
        >
          Events
        </span>
      </div>

      {profileWhichTab === "quotes" ? (
        <QuoteList quotes={loginUserQuotes} />
      ) : profileWhichTab === "bookmarks" ? (
        myBookmarks?.quotes ? (
          <ListOfBookmarks quotes={myBookmarks.quotes} />
        ) : (
          <NoFetchedData text="No Bookmarks" />
        )
      ) : profileWhichTab === "likes" ? (
        <div>likes</div>
      ) : (
        <EventList />
      )}
    </div>
    // <Tabs defaultValue="quotes" className="w-full">
    //   <TabsList className="flex items-stretch">
    //     <TabsTrigger value="quotes" className="w-full text-center text-xs">
    //       Quotes
    //     </TabsTrigger>
    //     <TabsTrigger value="Bookmarks" className="w-full text-center text-xs">
    //       Bookmarks
    //     </TabsTrigger>
    //     <TabsTrigger value="Events" className="w-full text-center text-xs">
    //       Events
    //     </TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="quotes">
    //     <QuoteList quotes={loginUserQuotes} />
    //   </TabsContent>
    //   <TabsContent value="Bookmarks">
    //     {myBookmarks?.quotes ? (
    //       <ListOfBookmarks quotes={myBookmarks.quotes} />
    //     ) : (
    //       <NoFetchedData text="No Bookmarks" />
    //     )}
    //   </TabsContent>
    //   <TabsContent value="Events">
    //     <EventList />
    //   </TabsContent>
    // </Tabs>
  );
};

export default ContentSwitchTabs;
