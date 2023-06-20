import { auth } from "@/app/config/Firebase";
import Image from "next/image";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultIcon from "@/public/default_user_icon.png";
import EditBtn from "./EditBtn";

const ProfilePic = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="px-5 my-10 relative flex flex-col items-center gap-5">
      <Image
        src={user?.photoURL! || defaultIcon}
        alt="user photo / default user photo"
        width={200}
        height={200}
        className="rounded-full"
      />
      {user ? <p>{user.displayName}</p> : null}
      <div className="absolute right-0 top-0">
        <EditBtn />
      </div>
    </div>
  );
};

export default ProfilePic;
