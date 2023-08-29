'use client';
import { auth } from "@/config/Firebase";
import ContentSwitchTabs from "@/components/profile/tabs/ContentSwitchTabs";
import Loading from "@/components/utils/Loading";
import { useAuth } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import EditMode from "@/components/profile/EditMode";
import UserInfoCard from "@/components/profile/UserInfoCard";
import EditBtn from "@/components/profile/EditBtn";

export const metadata = {
  title: "Login User Profile",
};

const LoginUserProfile = () => {
  const [user] = useAuthState(auth);
  const { loginUser, fetchLoginUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, [user]);
  if (!loginUser) return <Loading />;

  return (
    <div className="mb-32 p-5 sm:p-0">
      <div className="relative my-10 flex flex-col items-center gap-5 px-5">
        {isEditMode ? (
          <EditMode setIsEditMode={setIsEditMode} />
        ) : (
          <>
            <UserInfoCard />
            <EditBtn isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
          </>
        )}
      </div>
      <ContentSwitchTabs />
      {/* <Settings /> */}
    </div>
  );
};

export default LoginUserProfile;