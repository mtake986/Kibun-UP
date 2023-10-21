import React from "react";
import { auth } from "@/config/Firebase";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultIcon from "@/public/defaultUserImage.png";
import LogOutBtn from "./LogOutBtn";
import { useAuth } from "@/context/AuthContext";
import { TypeLoginUser } from "@/types/type";
import { useQuote } from "@/context/QuoteContext";
import { Quote } from "lucide-react";
import { BsChatQuote } from "react-icons/bs";

type Props = {
  loginUser: TypeLoginUser;
};
const UserInfoCard = ({ loginUser }: Props) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <Image
        src={loginUser.photoURL!}
        alt="loginUser photo / default loginUser photo"
        width={250}
        height={250}
        className="h-40 w-40 rounded-full object-cover object-center sm:h-48 sm:w-48"
      />
      <div className="flex flex-col items-center">
        <p>
          <span className="text-xs">Name: </span>
          <span className="font-semibold">{loginUser.displayName}</span>
        </p>
        <p>
          <span className="text-xs">Items/page: </span>
          <span className="font-semibold">
            {loginUser.settings.itemsPerPage}
          </span>
        </p>
      </div>
      <LogOutBtn />
    </div>
  );
};

export default UserInfoCard;
