import { auth } from "@/config/Firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import List from "@/components/quote/Mine/List";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import ListNotMine from "./NotMine/ListNotMine";
import Loading from "../utils/Loading";
import ListOfBookmarks from "./bookmarks/ListOfBookmarks";

const SwitchTab = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    loginUserQuotes,
    getLoginUserQuotes,
    quotesNotMine,
    getQuotesNotMine,
    fetchFavQuotes,
    fetchMyBookmarks,
    fetchNumOfBookmarks,
    myBookmarks,
    getLockedQuote,

    whichList,
    handleWhichList,
  } = useQuote();

  useEffect(() => {
    setLoading(true);
    getLoginUserQuotes();
    getQuotesNotMine();
    fetchFavQuotes();
    getLockedQuote(user?.uid);
    fetchMyBookmarks();
    fetchNumOfBookmarks();
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div defaultValue="yours" className="w-full">
      <div className="flex items-stretch">
        <span
          className="w-full text-center text-xs"
          onClick={() => handleWhichList("yours")}
        >
          Mine
        </span>
        <span
          className="w-full text-center text-xs"
          onClick={() => handleWhichList("bookmarks")}
        >
          Bookmarks
        </span>
        <span
          className="w-full text-center text-xs"
          onClick={() => handleWhichList("all")}
        >
          All
        </span>
      </div>

      {whichList === "yours" ? (
        user ? (
          <List quotes={loginUserQuotes} />
        ) : (
          <GoogleLoginBtn />
        )
      ) : whichList === "bookmarks" ? (
        myBookmarks?.quotes && <ListOfBookmarks quotes={myBookmarks.quotes} />
      ) : (
        <ListNotMine quotes={quotesNotMine} />
      )}
    </div>
  );
};

export default SwitchTab;
