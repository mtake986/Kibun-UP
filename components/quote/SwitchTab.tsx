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
    <div>
      <div className="mb-1 flex items-stretch">
        <span
          className={`cursor-pointer w-full py-1 text-center text-xs sm:text-sm ${
            whichList === "yours"
              ? "rounded-2xl bg-violet-50 text-violet-500"
              : ""
          }`}
          onClick={() => handleWhichList("yours")}
        >
          Mine
        </span>
        <span
          className={`cursor-pointer w-full py-1 text-center text-xs sm:text-sm ${
            whichList === "all"
              ? "rounded-2xl bg-violet-50 text-violet-500"
              : ""
          }`}
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
      ) : (
        <ListNotMine quotes={quotesNotMine} />
      )}
    </div>
  );
};

export default SwitchTab;
