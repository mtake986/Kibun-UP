"use client";
import { auth } from "@/app/config/Firebase";
import Profile from "@/components/profile/Profile";
import ContentSwitchTabs from "@/components/profile/tabs/ContentSwitchTabs";
import Loading from "@/components/utils/Loading";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfilePage() {


  const [user] = useAuthState(auth);

  if (!user) return <Loading />;
  
  return (
    <div>
      <Profile />
      <ContentSwitchTabs />
    </div>
  );
}
