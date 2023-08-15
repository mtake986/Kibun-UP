"use client";
import { auth } from "@/app/config/Firebase";
import Profile from "@/components/profile/Profile";
import ContentSwitchTabs from "@/components/profile/tabs/ContentSwitchTabs";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfilePage() {


  const [user] = useAuthState(auth);

  if (!user) return <div className="text-center text-2xl">Loading...</div>;
  return (
    <div>
      <Profile />
      <ContentSwitchTabs />
    </div>
  );
}
