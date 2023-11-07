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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loginUser, fetchLoginUser } = useAuth();
  const { randomEvent, lockedEvent, getRandomEvent, getLockedEvent } =
    useEvent();

  const { randomQuote, lockedQuote, updateRandomQuote, getLockedQuote } =
    useQuote();

  const [user] = useAuthState(auth);
  useEffect(() => {
    const fetchEvents = () => {
      setIsLoading(true);
      if (user && !lockedEvent) getLockedEvent();
      if (user && !randomEvent) getRandomEvent();
    };
    const fetchQuotes = async () => {
      if (user && !lockedQuote) getLockedQuote();
      if (user && !randomQuote) updateRandomQuote();
    };

    if (user) {
      try {
        fetchLoginUser(auth.currentUser);
        // if (!(lockedEvent || randomEvent) && !lockedEvent && !randomEvent) {
        if (!lockedEvent && !randomEvent) {
          fetchEvents();
        }
        // if (!(lockedQuote || randomQuote) && !lockedQuote && !randomQuote) {
        if (!lockedQuote && !randomQuote) {
          console.log("randomQuote: ", randomQuote);
          fetchQuotes();
        }
      } catch (error) {
        displayErrorToast(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        console.log(auth.currentUser);
      }
    } else {
      setIsLoading(true);
    }
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator text={"Loading contents..."} />;
  } else {
    if (!auth.currentUser) {
      return <GoogleLoginBtn />;
    } else {
      return (
        <>
          {!lockedEvent && !randomEvent ? (
            <LoadingIndicator text={"Loading an Event..."} />
          ) : (
            <Event />
          )}
          {!lockedQuote && !randomQuote ? (
            <LoadingIndicator text={"Loading a Quote..."} />
          ) : (
            <Quote />
          )}
        </>
      );
    }
  }
};

export default Home;
