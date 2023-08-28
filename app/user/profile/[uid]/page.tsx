"use client";
import { auth } from "@/config/Firebase";
import Profile from "@/components/profile/Profile";
import Settings from "@/components/profile/settings/Settings";
import ContentSwitchTabs from "@/components/profile/tabs/ContentSwitchTabs";
import Loading from "@/components/utils/Loading";
import { useAuth } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const { loginUser, fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, [user]);
  if (!loginUser) return <Loading />;

  return (
    <div className="mb-32 p-5 sm:p-0">
      <Profile />
      <ContentSwitchTabs />
      {/* <Settings /> */}
    </div>
  );
}
