import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvent } from "@/app/context/EventContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";

import List from "./list/Mine/List";
import ListNotMine from "./list/NotMine/List";

const SwitchTab = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState<boolean>(false);
  const {
    loginUserEvents,
    getLoginUserEvents,
    eventsNotMine,
    getEventsNotMine,
  } = useEvent();
  useEffect(() => {
    setLoading(true);
    getLoginUserEvents();
    getEventsNotMine();
    setLoading(false);
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
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
          {user ? <List events={loginUserEvents} /> : <GoogleLoginBtn />}
        </TabsContent>
        <TabsContent value="All">
          <ListNotMine eventsNotMine={eventsNotMine} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SwitchTab;