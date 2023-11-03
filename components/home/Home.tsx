"use client";

import React, { useEffect, useState } from "react";
import Quote from "./quote/Quote";
import Event from "./event/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";
import { useEvent } from "@/context/EventContext";
import { displayErrorToast, displayToast } from "@/functions/displayToast";
import LoadingSpinnerL from "../utils/LoadingSpinnerL";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import useFetchQuoteFromQuotableAPI from "../hooks/useFetchQuoteFromQuotableAPI";
import { createProperUrl } from "@/functions/createProperUrl";
import LoadingIndicator from "./LoadingIndicator";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { loginUser, fetchLoginUser } = useAuth();

  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      try {
        fetchLoginUser(auth.currentUser);
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
    return <LoadingIndicator text={"Loading an Login User..."} />;
  } else {
    if (!auth.currentUser) {
      return <GoogleLoginBtn />;
    } else {
      return (
        <>
          <Event />
          <Quote />
        </>
      );
    }
  }
};

export default Home;
