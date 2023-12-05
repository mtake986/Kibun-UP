"use client";
import { auth } from "@/config/Firebase";
import Data from "@/components/profile/data/Data";
import { useAuth } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import EditMode from "@/components/profile/EditMode";
import UserInfoCard from "@/components/profile/userInfoCard/UserInfoCard";
import EditBtn from "@/components/profile/actions/EditBtn";
import Settings from "./settings/Settings";
import { useQuote } from "@/context/QuoteContext";
import { useEvent } from "@/context/EventContext";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingSpinnerL from "../utils/LoadingSpinnerL";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";
import Actions from "./actions/Actions";
import { useSearchParams } from "next/navigation";

const LoginUserProfile = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("uid");

  const [user] = useAuthState(auth);
  const {
    getLockedQuote,
    getLoginUserQuotes,
    fetchAllQuotes,
    lockedQuote,
    loginUserQuotes,
    allQuotes,
  } = useQuote();
  const { loginUser, fetchLoginUser } = useAuth();
  const { loginUserEvents, getLoginUserEvents } = useEvent();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    try {
      if (loginUser) {
        if (!allQuotes || allQuotes.length <= 0) fetchAllQuotes();
        if (!loginUserQuotes || loginUserQuotes.length === 0) {
          getLoginUserQuotes();
        }
        if (!lockedQuote) getLockedQuote();
        if (!loginUserEvents || loginUserEvents.length === 0) {
          getLoginUserEvents();
        }
      } else {
        fetchLoginUser(auth.currentUser);
      }
      setIsError(false);
    } catch (error) {
      displayErrorToast(error);
      setIsError(true);
    }
  }, [user, loginUser]);

  if (!user) {
    return <GoogleLoginBtn />;
  }

  if (!loginUser) return <LoadingSpinnerL />;

  if (isError) return <div>Something wrong here</div>;

  return (
    <div className="mb-32 p-5 sm:p-0">
      <div>pathname: {search}</div>
      {isEditMode ? (
        <div className="mb-5 flex flex-col items-center gap-5 px-5">
          <EditMode setIsEditMode={setIsEditMode} />
        </div>
      ) : (
        <div className="mb-5 flex flex-col items-start gap-2">
          <UserInfoCard
            loginUser={loginUser}
            numOfQuotes={loginUserQuotes.length}
            numOfEvents={loginUserEvents.length}
          />
          <Actions setIsEditMode={setIsEditMode} />
        </div>
      )}

      <Data loginUser={loginUser} />
      <Settings />
    </div>
  );
};

export default LoginUserProfile;
