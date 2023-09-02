import React from "react";
import { auth } from "@/config/Firebase";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultIcon from "@/public/defaultUserImage.png";
import LogOutBtn from "./LogOutBtn";

const UserInfoCard = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col items-center gap-5 ">
      <Image
        src={user?.photoURL! || defaultIcon}
        alt="user photo / default user photo"
        width={250}
        height={250}
        className="sm:h-48 sm:w-48 w-32 h-32 rounded-full object-cover object-center"
      />
      {user ? <p>{user.displayName}</p> : null}
      {user && <LogOutBtn />}
    </div>
  );
};

export default UserInfoCard;
