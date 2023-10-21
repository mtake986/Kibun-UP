"use client";
import { auth } from "@/config/Firebase";
import Data from "@/components/profile/data/Data";
import Loading from "@/components/utils/Loading";
import { useAuth } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import EditMode from "@/components/profile/EditMode";
import UserInfoCard from "@/components/profile/UserInfoCard";
import EditBtn from "@/components/profile/EditBtn";
import Settings from "./settings/Settings";
import { useQuote } from "@/context/QuoteContext";
import { useEvent } from "@/context/EventContext";
import { displayErrorToast } from "@/functions/displayToast";

export const metadata = {
  title: "Login User Profile",
};

const LoginUserProfile = () => {
  const [user] = useAuthState(auth);
  const {
    getLockedQuote,
    getLoginUserQuotes,
    fetchAllQuotes,
    lockedQuote,
    allQuotes,
  } = useQuote();
  const { loginUser, fetchLoginUser } = useAuth();
  const { loginUserEvents, getLoginUserEvents } = useEvent();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    try {
      !loginUser ? fetchLoginUser(auth.currentUser) : null;
      if (!allQuotes || allQuotes.length <= 0) fetchAllQuotes();
      if (!loginUser) getLoginUserQuotes();
      if (!lockedQuote) getLockedQuote();
      if (!loginUserEvents || loginUserEvents.length <= 0) {
        getLoginUserEvents();
      }
      setIsError(false);
    } catch (error) {
      displayErrorToast(error);
      setIsError(true)
    }
  }, [user]);

  if (!loginUser) return <Loading />;

  if (isError) return <div>Something wrong here</div>;
  
  return (
    <div className="mb-32 p-5 sm:p-0">
      <div className="relative my-10 flex flex-col items-center gap-5 px-5">
        {isEditMode ? (
          <EditMode setIsEditMode={setIsEditMode} />
        ) : (
          <>
            <UserInfoCard loginUser={loginUser} />
            <EditBtn isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </>
        )}
      </div>
      <Data loginUser={loginUser} />
      <Settings />
    </div>
  );
};

export default LoginUserProfile;
