"use client";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import { User2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import UrlLink from "../utils/UrlLink";

const ProfilePic = () => {
  const [user] = useAuthState(auth);

  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);

  if (!user) {
    return (
      <div
        onClick={() => {
          signInWithGoogle();
        }}
        // href="/login"
        className="cursor-pointer text-violet-500 duration-300 hover:text-white dark:text-white lg:mt-0 lg:inline-block"
      >
        Login
      </div>
    );
  }

  return (
    <UrlLink
      target="_self"
      clickOn={<User2 size={24} />}
      className="p-1 text-violet-500 duration-300 hover:opacity-50 dark:text-white"
      href={`/user/profile/${user?.uid}/`}
    />
  );
};

export default ProfilePic;
