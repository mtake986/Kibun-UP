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
import { usePathname } from "next/navigation";
import { extractUidFromPath } from "@/functions/extractUidFromPath";
import NoProfileUser from "./NoProfileUser";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";

const UserProfile = () => {
  const pathname = usePathname();
  // const uid = extractUidFromPath(pathname);

  const [uid, setUid] = useState<string>(extractUidFromPath(pathname));
  const [isPending, setIsPending] = useState<boolean>(true);

  const [user] = useAuthState(auth);

  const { getLockedQuote, fetchProfileUserQuotes, profileUserQuotes } =
    useQuote();
  const { profileUserEvents, fetchProfileUserEvents } = useEvent();
  const { loginUser, fetchLoginUser, fetchUser, profileUser } = useAuth();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsPending(true);
      fetchLoginUser(auth.currentUser);
      if (uid) {
        fetchUser(uid);
        fetchProfileUserQuotes(uid);
        fetchProfileUserEvents(uid);
        getLockedQuote();
      }
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setIsPending(false);
    }
  }, [user]);

  if (!user) {
    return <GoogleLoginBtn />;
  }
  if (isPending) return <div>loading</div>;

  if (!profileUser) return <NoProfileUser uid={uid} />;

  const isPathnameSameAsLoginUser = uid === loginUser?.uid;

  return (
    <div className="mb-32 p-5 sm:p-0">
      {isPathnameSameAsLoginUser ? (
        isEditMode ? (
          <div className="mb-5 flex flex-col items-center gap-5">
            <EditMode setIsEditMode={setIsEditMode} />
          </div>
        ) : (
          <div className="mb-5 flex flex-col items-start gap-3">
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

export default UserProfile;
