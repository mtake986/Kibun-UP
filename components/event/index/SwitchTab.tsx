import React, { useEffect, useState } from "react";
import { useEvent } from "@/context/EventContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import List from "../mine/List";
import { displayErrorToast } from "@/functions/displayToast";

const SwitchTab = () => {
  const [user] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    loginUserEvents,
    getLoginUserEvents,
    eventsNotMine,
    getEventsNotMine,
  } = useEvent();
  useEffect(() => {
    setIsLoading(true);
    const fetchDocs = () => {
      setIsLoading(true);
      getLoginUserEvents();
      getEventsNotMine();
      setIsLoading(false);
    }
    try {
      fetchDocs();
    } catch (error) {
      displayErrorToast(error);
    }
    setIsLoading(false);
  }, [user]);

  return (
    <>
      {/* <Tabs defaultValue="yours" className="w-full">
        <TabsList className="flex items-stretch">
          <TabsTrigger value="yours" className="w-full text-center">
            Yours
          </TabsTrigger>
          <TabsTrigger value="All" className="w-full text-center">
            All
          </TabsTrigger>
        </TabsList>
        <TabsContent value="yours"> */}
      {loginUserEvents.length >= 1 ? <List events={loginUserEvents} /> : <GoogleLoginBtn />}
      {/* </TabsContent>
        <TabsContent value="All">
          <ListNotMine eventsNotMine={eventsNotMine} />
        </TabsContent>
      </Tabs> */}
    </>
  );
};

export default SwitchTab;
