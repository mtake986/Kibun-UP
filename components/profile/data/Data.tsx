import { auth } from "@/config/Firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuote } from "@/context/QuoteContext";
import QuoteList from "./tabs/quotes/QuoteList";
import EventList from "./tabs/events/EventList";
import ListOfBookmarks from "./tabs/bookmarks/ListOfBookmarks";
import MobileSortFilterForQuotesOpenBtn from "./tabs/quotes/MobileSortFilterForQuotesOpenBtn";
import { TypeLoginUser } from "@/types/type";
import Tabs from "./tabs/Tabs";
import ListOfLikes from "./tabs/likes/ListOfLikes";
import SectionTitle from "../SectionTitle";
import { displayErrorToast } from "@/functions/displayToast";
import { useEvent } from "@/context/EventContext";

type Props = {
  loginUser: TypeLoginUser;
};
const Data = ({ loginUser }: Props) => {
  const {
    loginUserQuotes,
    profileWhichTab,
    allQuotes,
  } = useQuote();

  return (
    <div className="relative mt-10">
      <SectionTitle title="Your Data" />

      {profileWhichTab === "quotes" ? (
        <MobileSortFilterForQuotesOpenBtn />
      ) : null}

      <Tabs loginUser={loginUser} />

      {profileWhichTab === "quotes" ? (
        <QuoteList quotes={loginUserQuotes} />
      ) : profileWhichTab === "bookmarks" ? (
        <ListOfBookmarks quotes={allQuotes} loginUser={loginUser} />
      ) : profileWhichTab === "likes" ? (
        <ListOfLikes quotes={allQuotes} loginUser={loginUser} />
      ) : (
        <EventList />
      )}
    </div>
  );
};

export default Data;
