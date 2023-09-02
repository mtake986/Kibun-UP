import React from "react";
import { auth } from "@/config/Firebase";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultIcon from "@/public/defaultUserImage.png";
import LogOutBtn from "./LogOutBtn";
import { useAuth } from "@/context/AuthContext";

const UserInfoCard = () => {
  const {loginUser} = useAuth();

  return (
    <div className="flex flex-col items-center gap-5 ">
      {loginUser ? (
        <>
          <Image
            src={loginUser.photoURL!}
            alt="loginUser photo / default loginUser photo"
            width={250}
            height={250}
            className="h-32 w-32 rounded-full object-cover object-center sm:h-48 sm:w-48"
          />
          <p>{loginUser.displayName}</p>
          <p>{loginUser.paginationNum}</p>
          <LogOutBtn />
        </>
      ) : null}
    </div>
  );
};

export default UserInfoCard;
