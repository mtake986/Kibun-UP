'use client';
import UrlLink from "@/components/utils/UrlLink";
import { auth } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";

const UserActivity = () => {

  const {loginUser} = useAuth();

  const goBackBtn = () => {
    return (
      <div className="flex items-center gap-2 p-1 m-1">
        <ArrowLeft size={20} />
        <div className="cursor-pointer">
          Back
        </div>
      </div>
    );
  };

  return <div>
          <UrlLink
        href={`/user/profile/${loginUser?.uid}`}
        clickOn={goBackBtn()}
        target="_self"
        className="hover:opacity-70 duration-200"
      />
  </div>;
};

export default UserActivity;
