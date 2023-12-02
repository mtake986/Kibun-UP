"use client";
import React, { useEffect } from "react";
import UserActivityHeader from "../UserActivityHeader";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";

const UserActivityLikes = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!loginUser) fetchLoginUser(auth.currentUser);
  }, [auth.currentUser]);

  if (!loginUser) {
    return null;
  }
  return (
    <div className="mt-5 px-3">
      <UserActivityHeader
        linkTo={`/user/profile/${loginUser?.uid}/activity`}
        text="Likes"
      />
    </div>
  );
};

export default UserActivityLikes;
