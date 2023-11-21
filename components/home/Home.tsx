"use client";

import React, { useEffect, useState } from "react";
import Quote from "./quote/Quote";
import Event from "./event/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";
import { useEvent } from "@/context/EventContext";
import { displayErrorToast, displayToast } from "@/functions/displayToast";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import LoadingIndicator from "./LoadingIndicator";

const Home = () => {
  const { fetchLoginUser } = useAuth();
  const { randomEvent, lockedEvent, getRandomEvent, getLockedEvent } =
    useEvent();

  const { randomQuote, lockedQuote, updateRandomQuote, getLockedQuote } =
    useQuote();

  const [isEventLoading, setIsEventLoading] = useState<boolean>(false);
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false);

  const [user] = useAuthState(auth);
  useEffect(() => {
    setIsEventLoading(true);
    setIsQuoteLoading(true);
    const fetchEvents = async () => {
      if (user && !lockedEvent) await getLockedEvent();
      if (user && !randomEvent) await getRandomEvent();
    };
    const fetchQuotes = async () => {
      if (user && !lockedQuote) await getLockedQuote();
      if (user && !randomQuote) await updateRandomQuote();
    };

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
      } finally {
        console.log(auth.currentUser);
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
