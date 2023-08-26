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
    <Tabs defaultValue="quotes" className="w-full">
      <TabsList className="flex items-stretch">
        <TabsTrigger value="quotes" className="w-full text-center">
          Quotes
        </TabsTrigger>
        <TabsTrigger value="Bookmarks" className="w-full text-center">
          Bookmarks
        </TabsTrigger>
        <TabsTrigger value="Events" className="w-full text-center">
          Events
        </TabsTrigger>
      </TabsList>
      <TabsContent value="quotes">
        <QuoteList quotes={loginUserQuotes} />
      </TabsContent>
      <TabsContent value="Bookmarks">
        {myBookmarks?.quotes ? (
          <ListOfBookmarks quotes={myBookmarks.quotes} />
        ) : (
          <NoFetchedData text="No Bookmarks" />
        )}
      </TabsContent>
      <TabsContent value="Events">
        <EventList />
      </TabsContent>
    </Tabs>
  );
};

export default ContentSwitchTabs;
