"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import Tabs from "@/components/quote/Tabs";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { useAuth } from "@/context/AuthContext";

import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingIndicator from "../home/LoadingIndicator";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Quote = () => {
  const [user] = useAuthState(auth);
  const { loginUser, fetchLoginUser } = useAuth();
  const {
    loginUserQuotes,
    getLoginUserQuotes,
    quotesNotMine,
    getLockedQuote,
    lockedQuote,
    getQuotesNotMine,
    apiQuotesFromFirestore,
    fetchApiQuotesFromFirestore,
  } = useQuote();

  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  useEffect(() => {
    const fetchDocs = async () => {
      fetchLoginUser(user);
      if (!loginUserQuotes || loginUserQuotes.length === 0) {
        console.log("fetching login user quotes");
        getLoginUserQuotes();
      }
      if (!lockedQuote) await getLockedQuote();
      if (!quotesNotMine || quotesNotMine.length === 0)
        await getQuotesNotMine();
      if (apiQuotesFromFirestore.length === 0)
        await fetchApiQuotesFromFirestore();
    };

    try {
      fetchDocs();
    } catch (error) {
      displayErrorToast(
        `An unexpected error occurred. Please try again later.`
      );
    }
  }, [user]);

  if (!user) {
    return <GoogleLoginBtn />;
  }

  if (!loginUser) {
    return <LoadingIndicator text={"Loading a Login User..."} />;
  } else {
    return (
      <div className="px-5 py-10 sm:mb-32 sm:p-0">
        {/* {user.metadata.lastSignInTime} */}
        <div className="relative">
          <HeadingTwo text="Quotes" />
          <ScrollToTopBtn />
          <RegisterFormToggleBtn />
          <Tabs />
        </div>
      </div>
    );
  }
};

export default Quote;
