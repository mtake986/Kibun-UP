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
    const fetchDocs = async () => {
      try {
        await getLoginUserEvents();
        await getEventsNotMine();
      } catch (error) {
        displayErrorToast(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocs();
  }, [user]);

  return (
    <>
      {loginUserEvents.length >= 1 ? (
        <List events={loginUserEvents} />
      ) : (
        <GoogleLoginBtn />
      )}
    </>
  );
};

export default SwitchTab;
