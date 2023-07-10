"use client";

import { auth } from "@/app/config/Firebase";
import Profile from "@/components/profile/Profile";
import ContentSwitchTabs from "@/components/profile/tabs/ContentSwitchTabs";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ProfilePage() {

  return (
    <div>
      <Profile />
      <ContentSwitchTabs />
    </div>
  );
}
