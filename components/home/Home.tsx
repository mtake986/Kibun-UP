"use client"
import React, { useEffect, useState } from "react";
import Quote from "./quote/Quote";
import Event from "./event/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";
import { useEvent } from "@/context/EventContext";
import { displayErrorToast } from "@/functions/displayToast";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import LoadingIndicator from "./LoadingIndicator";

const Home = () => {
  const { fetchLoginUser } = useAuth();
  const {
    getRandomEvent,
    getLockedEvent,
    getEventsWithSortAndFilter,
  } = useEvent();

  const { updateRandomQuote, getLockedQuote } =
    useQuote();

  const [isEventLoading, setIsEventLoading] = useState<boolean>(false);
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false);

  const [user] = useAuthState(auth);
  useEffect(() => {
    setIsEventLoading(true);
    setIsQuoteLoading(true);
    const fetchEvents = async () => {
      await getLockedEvent();
      await getEventsWithSortAndFilter('loginUser');
      await getRandomEvent();
    };
    const fetchQuotes = async () => {
      await getLockedQuote();
      await updateRandomQuote();
    };

    console.log('useeffect inside')
    if (user) {
      try {
        fetchLoginUser(auth.currentUser);
        fetchEvents().then(() => {
          setIsEventLoading(false);
        });
        fetchQuotes().then(() => {
          setIsQuoteLoading(false);
        });
      } catch (error) {
        displayErrorToast(error);
      } 
    }
  }, [user]);

  if (!auth.currentUser) {
    return <GoogleLoginBtn />;
  } else {
    return (
      <>
        {isEventLoading ? (
          <LoadingIndicator text={"Loading an Event..."} />
        ) : (
          <Event />
        )}
        {isQuoteLoading ? (
          <LoadingIndicator text={"Loading a Quote..."} />
        ) : (
          <Quote />
        )}
      </>
    );
  }
};

export default Home;
