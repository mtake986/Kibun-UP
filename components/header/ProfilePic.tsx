"use client";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import { User2 } from "lucide-react";
import UrlLink from "../utils/UrlLink";

const ProfilePic = () => {
  const [user] = useAuthState(auth);

  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Authentication Error</div>;
  }

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
      clickOn={<User2 size={20} />}
      className="hidden w-5 text-violet-500 duration-300 hover:opacity-50 dark:text-white sm:inline"
      href={`/profile/${user?.uid}`}
    />
  );
};

export default ProfilePic;
