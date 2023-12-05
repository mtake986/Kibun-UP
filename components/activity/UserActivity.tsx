"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import UserActivityHeader from "./UserActivityHeader";
import UrlLink from "@/components/utils/UrlLink";
import { usePathname } from "next/navigation";
import { BsChatQuote, BsFlag, BsHouse, BsPerson } from "react-icons/bs";
import { AiOutlineContacts } from "react-icons/ai";
import { auth } from "@/config/Firebase";
import { Bookmark, Heart } from "lucide-react";
import { MdArrowForwardIos } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";

const UserActivity = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const pathname = usePathname();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!loginUser) fetchLoginUser(auth.currentUser);
  }, [user]);

  if (!loginUser) {
    return null;
  }

  const item = (text: string, icon: React.JSX.Element) => {
    return (
      <div className="flex ">
        <div className="flex items-center gap-3">
          {icon}
          <p>{text}</p>
        </div>
      </div>
    );
  };

  const footerListItems = [
    {
      href: `/user/profile/${loginUser?.uid}/activity/likes`,
      target: "_self",
      clickOn: item("Likes", <Heart size={16} />),
    },
    {
      href: `/user/profile/${loginUser?.uid}/activity/bookmarks`,
      target: "_self",
      clickOn: item("Bookmarks", <Bookmark size={16} />),
    },
  ];

  return (
    <div className="mt-5 px-3">
      <UserActivityHeader text="Your Activity" />
      <h4 className="text-left text-gray-500 mb-1">Interactions</h4>
      <div className="flex w-full flex-col items-center justify-between gap-3 px-10">
        {footerListItems.map((item, i) => (
          <div className="flex justify-between items-center w-full hover:opacity-70 cursor-pointer" key={item.href}>
            <UrlLink
              href={item.href}
              target={item.target}
              clickOn={item.clickOn}
            />
            <MdArrowForwardIos
              size={16}
              className="text-gray-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivity;
