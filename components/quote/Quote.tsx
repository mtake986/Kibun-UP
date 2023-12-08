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
import MobileSortFilterForMineOpenBtn from "./mine/MobileSortFilterForMineOpenBtn";
import MobileSortFilterForNotMineOpenBtn from "./notMine/MobileSortFilterForNotMineOpenBtn";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingIndicator from "../home/LoadingIndicator";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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
    fetchAllQuotes,
    allQuotes,

    apiQuotesFromFirestore,
    fetchApiQuotesFromFirestore,
  } = useQuote();

  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocs = async () => {
      if (!loginUserQuotes || loginUserQuotes.length === 0) {
        console.log("fetching login user quotes");
        getLoginUserQuotes();
      }
      if (!lockedQuote) await getLockedQuote();
      if (!quotesNotMine || quotesNotMine.length === 0)
        await getQuotesNotMine();
      if (allQuotes.length === 0) await fetchAllQuotes();
      if (apiQuotesFromFirestore.length === 0)
        await fetchApiQuotesFromFirestore();
    };
    try {
      setIsPending(true);
      if (loginUser) {
        fetchDocs().then(() => setIsPending(false));
      } else {
        if (auth.currentUser) {
          fetchLoginUser(auth.currentUser);
        } else {
          // Handle the case where auth.currentUser is null
          displayErrorToast("Please log in.");
        }
      }
    } catch (error) {
      displayErrorToast(
        `An unexpected error occurred. Please try again later.`
      );
    } finally {
      // setTimeout(() => {
        
      // }, 5000);
    }
  }, [user, loginUser]);

  if (!user) {
    return <GoogleLoginBtn />;
  }

  if (!loginUser) {
    return <LoadingIndicator text={"Loading a Login User..."} />;
  } else if (isPending) {
    return <div>{loginUser?.uid}, Pending...</div>;
  } else {
    return (
      <div className="px-5 py-10 sm:mb-32 sm:p-0">
        <div className="relative">
          <HeadingTwo text="Quotes" />
          <ScrollToTopBtn />
          <RegisterFormToggleBtn />
          {currTab === "mine" || currTab === null ? (
            <MobileSortFilterForMineOpenBtn />
          ) : currTab === "all" ? (
            <MobileSortFilterForNotMineOpenBtn />
          ) : null}
          <Tabs />
        </div>
      </div>
    );
  }
};

export default Quote;
