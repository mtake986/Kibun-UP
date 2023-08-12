import { auth } from "@/app/config/Firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import List from "@/components/quote/Mine/List";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/app/context/QuoteContext";
import ListNotMine from "./NotMine/ListNotMine";

const SwitchTab = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    loginUserQuotes,
    getLoginUserQuotes,
    quotesNotMine,
    getQuotesNotMine,
    fetchFavQuotes,
    sortByElement,
  } = useQuote();

  useEffect(() => {
    setLoading(true);
    getLoginUserQuotes();
    getQuotesNotMine();
    fetchFavQuotes();
    setLoading(false);
  }, [user]);

  // useEffect(() => {
  //   setLoading(true)
  //   loginUserQuotes.sort((a, b) => {
  //     if (sortByElement === "quote") {
  //       return a.quote > b.quote ? -1 : a.quote < b.quote ? 1 : 0;
  //     } else if (sortByElement === "person") {
  //       return a.person > b.person ? -1 : a.person < b.person ? 1 : 0;
  //     } else if (sortByElement === "createdAt") {
  //       return a.createdAt > b.createdAt
  //         ? -1
  //         : a.createdAt < b.createdAt
  //         ? 1
  //         : 0;
  //     } else return 0;
  //   });
  //   console.log(loginUserQuotes);
  //   setLoading(false)
  // }, [sortByElement]);

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
        {user ? <List quotes={loginUserQuotes}  /> : <GoogleLoginBtn />}
      </TabsContent>
      <TabsContent value="All">
        <ListNotMine quotes={quotesNotMine} />
      </TabsContent>
    </Tabs>
  );
};

export default SwitchTab;
