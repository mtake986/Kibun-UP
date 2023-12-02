'use client';
import React, { useEffect } from "react";
import UserActivityHeader from "../UserActivityHeader";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const UserActivityBookmarks = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!loginUser) fetchLoginUser(user);
  }, [user]);

  if (!loginUser) {
    return null;
  }

  return (
    <div className="mt-5 px-3">
      <UserActivityHeader
        linkTo={`/user/profile/${loginUser?.uid}/activity`}
        text="Bookmarks"
      />
    </div>
  );
};

export default UserActivityBookmarks;
