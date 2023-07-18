"use client";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import Image from "next/image";
import { LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePic = () => {
  const [user] = useAuthState(auth);

  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);

  const { handleLogout } = useAuth();

  if (!user) {
    return (
      <div
        onClick={() => {
          signInWithGoogle();
        }}
        // href="/login"
        className="cursor-pointer text-violet-200 duration-300 hover:text-white lg:mt-0 lg:inline-block"
      >
        Login
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        {/* {user?.photoURL && (
          <Image
            width={40}
            height={40}
            src={user?.photoURL}
            alt="profile pic"
            className="h-10 w-10 cursor-pointer rounded-full object-cover object-center duration-300 hover:opacity-70"
          />
        )} */}
        <User2 size={24} className="text-white cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="flex-col gap-1">
          <div
            className="flex cursor-pointer items-center gap-1 p-1 duration-300 hover:opacity-50"
            onClick={() => handleLogout()}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </div>
          <div>
            <Link
              className="flex cursor-pointer items-center gap-1 p-1 duration-300 hover:bg-slate-50 hover:opacity-50"
              href={`/user/profile/${user?.uid}/`}
            >
              <User2 size={16} className="mr-2" />
              Profile
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePic;
