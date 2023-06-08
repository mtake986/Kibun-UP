import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { Button } from "./ui/button";
import { LogOut, User2 } from "lucide-react";
import { AiFillProfile } from "react-icons/ai";
import Link from "next/link";
import { User } from "lucide-react";

const ProfilePic = () => {
  const [user] = useAuthState(auth);

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
            className="p-1 hover:opacity-50 flex cursor-pointer items-center gap-1"
            onClick={() => signOut(auth)}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </div>
          <Link
            className="p-1 hover:opacity-50 flex cursor-pointer items-center gap-1"
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
