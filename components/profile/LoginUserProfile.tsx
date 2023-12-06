"use client";
import { auth } from "@/config/Firebase";
import Data from "@/components/profile/data/Data";
import { useAuth } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import EditMode from "@/components/profile/EditMode";
import UserInfoCard from "@/components/profile/userInfoCard/UserInfoCard";
import Settings from "./settings/Settings";
import { useQuote } from "@/context/QuoteContext";
import { useEvent } from "@/context/EventContext";
import { displayErrorToast } from "@/functions/displayToast";
import Actions from "./actions/Actions";
import { useSearchParams } from "next/navigation";

const LoginUserProfile = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");

  const [user] = useAuthState(auth);

  const {
    getLockedQuote,
    fetchProfileUserQuotes,
    profileUserQuotes,
  } = useQuote();
  const { profileUserEvents, fetchProfileUserEvents } = useEvent();
  const { loginUser, fetchLoginUser, fetchUser, profileUser } = useAuth();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (loginUser) {
        if (uid) {
          fetchUser(uid);
          fetchProfileUserQuotes(uid);
          fetchProfileUserEvents(uid);
          getLockedQuote();
        }
      } else {
        fetchLoginUser(auth.currentUser);
      }
    } catch (error) {
      displayErrorToast(error);
    }
  }, [user, loginUser]);

  if (!loginUser) return <div>Please log in</div>;
  if (!profileUser) return <div>No Profile User</div>;

  const isPathnameSameAsLoginUser = uid === loginUser?.uid;

  return (
    <div className="mb-32 p-5 sm:p-0">
      {isPathnameSameAsLoginUser ? (
        isEditMode ? (
          <div className="mb-5 flex flex-col items-center gap-5 px-5">
            <EditMode setIsEditMode={setIsEditMode} />
          </div>
        ) : (
          <div className="mb-5 flex flex-col items-start gap-2">
            <UserInfoCard
              profileUser={profileUser}
              numOfQuotes={profileUserQuotes.length}
              numOfEvents={profileUserEvents.length}
              isPathnameSameAsLoginUser={isPathnameSameAsLoginUser}
            />
            <Actions setIsEditMode={setIsEditMode} />
          </div>
        )
      ) : (
        <div className="mb-5 flex flex-col items-start gap-2">
          <UserInfoCard
            profileUser={profileUser}
            numOfQuotes={profileUserQuotes.length}
            numOfEvents={profileUserEvents.length}
            isPathnameSameAsLoginUser={isPathnameSameAsLoginUser}
          />
        </div>
      )}

      <Data />
      {isPathnameSameAsLoginUser ? <Settings /> : null}
    </div>
  );
};

export default LoginUserProfile;
