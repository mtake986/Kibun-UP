"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import Image from "next/image";
import { LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

const ProfilePic = () => {
  const [user] = useAuthState(auth);

  const { handleLogout } = useAuth();

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          width={40}
          height={40}
          src={user?.photoURL ? user?.photoURL : "https://placehold.co/50x50"}
          alt="profile pic"
          className="cursor-pointer rounded-full duration-300 hover:opacity-70"
        />
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
          <Link
            className="flex cursor-pointer items-center gap-1 p-1 duration-300 hover:bg-slate-50 hover:opacity-50"
            href={`/user/profile/${user?.uid}/`}
          >
            <User2 size={16} className="mr-2" />
            Profile
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePic;
