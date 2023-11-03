"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import SelectTab from "@/components/quote/SwitchTab";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { useAuth } from "@/context/AuthContext";

import { useQuote } from "@/context/QuoteContext";
import MobileSortFilterForMineOpenBtn from "./mine/MobileSortFilterForMineOpenBtn";
import MobileSortFilterForNotMineOpenBtn from "./notMine/MobileSortFilterForNotMineOpenBtn";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingIndicator from "../home/LoadingIndicator";

const Quote = () => {
  const [user] = useAuthState(auth);
  const { loginUser, fetchLoginUser } = useAuth();

  const { whichList } = useQuote();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDocs = async () => {
      console.log("fetch loginUser");
      fetchLoginUser(user);
    };

    if (user) {
      try {
        if (!loginUser) {
          fetchDocs();
        }
      } catch (error) {
        displayErrorToast(error);
      } finally {
        console.log(user);
        setTimeout(() => setIsLoading(false), 500);
      }
    } else {
      setIsLoading(true);
    }
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator text={"Loading a Login User..."} />;
  } else {
    if (!loginUser) return <GoogleLoginBtn />;
    else {
      return (
        <div className="px-5 py-10 sm:mb-32 sm:p-0">
          <div className="relative">
            <HeadingTwo text="Quotes" />
            <RegisterFormToggleBtn />
            {whichList === "yours" ? (
              <MobileSortFilterForMineOpenBtn />
            ) : whichList === "all" ? (
              <MobileSortFilterForNotMineOpenBtn />
            ) : null}

            <SelectTab loginUser={loginUser} />
          </div>
        </div>
      );
    }
  }
};

export default Quote;
