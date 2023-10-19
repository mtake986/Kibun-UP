import { auth } from "@/config/Firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuote } from "@/context/QuoteContext";
import QuoteList from "./quotes/QuoteList";
import EventList from "./events/EventList";
import ListOfBookmarks from "./bookmarks/ListOfBookmarks";
import MobileSortFilterForQuotesOpenBtn from "./quotes/MobileSortFilterForQuotesOpenBtn";
import { TypeLoginUser } from "@/types/type";
import Tabs from "./Tabs";
import ListOfLikes from "./likes/ListOfLikes";
import SectionTitle from "../SectionTitle";

type Props = {
  loginUser: TypeLoginUser;
}
const Data = ({loginUser}: Props) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    getLockedQuote,
    getLoginUserQuotes,
    loginUserQuotes,
    profileWhichTab,
    fetchAllQuotes,
    allQuotes,
  } = useQuote();

  useEffect(() => {
    setLoading(true);
    getLoginUserQuotes();
    fetchAllQuotes();
    getLockedQuote();
  }, [user]);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="relative mt-10">
      <SectionTitle title="Your Data" />
      {/* <span className="absolute top-0 right-0 text-xs text-gray-400">
          {user?.displayName}
        </span> */}

      {profileWhichTab === "quotes" ? (
        <MobileSortFilterForQuotesOpenBtn />
      ) : null}

      <Tabs />

      {profileWhichTab === "quotes" ? (
        <QuoteList quotes={loginUserQuotes} />
      ) 
      : profileWhichTab === "bookmarks" ? (
          <ListOfBookmarks quotes={allQuotes} loginUser={loginUser} />
      ) 
      : profileWhichTab === "likes" ? (
        <ListOfLikes quotes={allQuotes} loginUser={loginUser} />
      ) 
      : (
        <EventList />
      )}
    </div>
  );
};

export default Data;
