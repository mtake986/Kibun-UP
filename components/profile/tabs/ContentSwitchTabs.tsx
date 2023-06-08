import { auth } from "@/app/config/Firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuote } from "@/app/context/QuoteContext";
import QuoteList from "./quote/QuoteList";
import EventList from "./event/EventList";

const ContentSwitchTabs = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState<boolean>(false);

  const { allQuotes, getAllQuotes, loginUsersQuotes, getLoginUsersQuotes } =
    useQuote();

  useEffect(() => {
    setLoading(true);
    getAllQuotes();
    getLoginUsersQuotes();
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs defaultValue="quotes" className="w-full">
      <TabsList className="flex items-stretch">
        <TabsTrigger value="quotes" className="w-full text-center">
          Quotes
        </TabsTrigger>
        <TabsTrigger value="Events" className="w-full text-center">
          Events
        </TabsTrigger>
      </TabsList>
      <TabsContent value="quotes">
        <QuoteList />
      </TabsContent>
      <TabsContent value="Events">
        <EventList />
      </TabsContent>
    </Tabs>
  );
};

export default ContentSwitchTabs;
