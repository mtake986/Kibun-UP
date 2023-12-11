"use client";
import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { auth } from "@/config/Firebase";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import { useEvent } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingIndicator from "@/components/home/LoadingIndicator";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";

export const metadata = {
  title: "Event",
};

const Event = () => {
  const [user] = useAuthState(auth);
  const { loginUser, fetchLoginUser } = useAuth();
  const {
    lockedEvent,
    getLockedEvent,
    loginUserEvents,
    getLoginUserEvents,
    fetchAllEvents, 
  } = useEvent();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // todo: fetch quotes created by all
  useEffect(() => {
    const fetchDocs = async () => {
      if (!loginUser) fetchLoginUser(user);
    };
    const fetchEvents = async () => {
      if (loginUserEvents.length === 0) getLoginUserEvents();
      if (!lockedEvent) getLockedEvent();
      fetchAllEvents();
    };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchDocs();
        await fetchEvents();
      } catch (error) {
        displayErrorToast(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (!user) {
    return <GoogleLoginBtn />;
  }

  if (!loginUser) {
    return <LoadingIndicator text={"Loading a Login User..."} />;
  } else {
    return (
      <div className="px-5 py-10 sm:mb-32 sm:p-0">
        <div className="relative">
          <HeadingTwo text="Events" />
          <RegisterFormToggleBtn />
          <Tabs />
        </div>
      </div>
    );
  }
};

export default Event;
