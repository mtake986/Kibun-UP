import React from "react";
import { auth } from "@/app/config/Firebase";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultIcon from "@/public/defaultUserImage.png";

const UserInfoCard = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col items-center gap-5 ">
      <Image
        src={user?.photoURL! || defaultIcon}
        alt="user photo / default user photo"
        width={250}
        height={250}
        className="h-48 w-48 rounded-full object-cover object-center"
      />
      {user ? <p>{user.displayName}</p> : null}
    </div>
  );
};

export default UserInfoCard;
