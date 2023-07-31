import { auth } from "@/app/config/Firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import List from "@/components/quote/Mine/List";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/app/context/QuoteContext";
import QuoteCard from "./Mine/QuoteCard";
import { boolean } from "zod";
import ListNotMine from "./NotMine/ListNotMine";

const SelectTab = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    loginUsersQuotes,
    getLoginUsersQuotes,
    quotesNotMine,
    getQuotesNotMine,
    fetchFavQuotes,
  } = useQuote();

  useEffect(() => {
    setLoading(true);
    getLoginUsersQuotes();
    getQuotesNotMine();
    fetchFavQuotes();
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Tabs defaultValue="yours" className="w-full">
      <TabsList className="flex items-stretch">
        <TabsTrigger value="yours" className="w-full text-center">
          Yours
        </TabsTrigger>
        <TabsTrigger value="All" className="w-full text-center">
          All
        </TabsTrigger>
      </TabsList>
      <TabsContent value="yours">
        {user ? <List quotes={loginUsersQuotes} /> : <GoogleLoginBtn />}
      </TabsContent>
      <TabsContent value="All">
        <ListNotMine quotes={quotesNotMine} />
      </TabsContent>
    </Tabs>
  );
};

export default SelectTab;
