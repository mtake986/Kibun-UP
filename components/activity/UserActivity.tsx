"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import UserActivityHeader from "./UserActivityHeader";
import UrlLink from "@/components/utils/UrlLink";
import { auth } from "@/config/Firebase";
import { Bookmark, Heart } from "lucide-react";
import { MdArrowForwardIos } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";

import { motion } from "framer-motion";
import { insertFromBottom, insertFromRight } from "@/data/CONSTANTS";
import { extractUidFromPath } from "@/functions/extractUidFromPath";
import { usePathname } from "next/navigation";
import LoadingSpinnerL from "../utils/LoadingSpinnerL";
import NotAccessiblePage from "../utils/NotAccessiblePage";

const UserActivity = () => {
  const { loginUser, fetchLoginUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const profileUserUid = extractUidFromPath(pathname);

  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!loginUser) fetchLoginUser(auth.currentUser);
  }, [user]);

  if (!loginUser) {
    return null;
  }

  const item = (text: string, icon: React.JSX.Element) => {
    return (
      <div className="flex cursor-pointer items-center justify-between hover:opacity-70">
        <div className="flex items-center gap-3">
          <span>{icon}</span>
          <span>{text}</span>
        </div>
        <MdArrowForwardIos size={16} className="text-gray-500" />
      </div>
    );
  };

  const listItems = [
    {
      href: `/profile/${loginUser?.uid}/activity/likes`,
      target: "_self",
      clickOn: item("Likes", <Heart size={16} />),
    },
    {
      href: `/profile/${loginUser?.uid}/activity/bookmarks`,
      target: "_self",
      clickOn: item("Bookmarks", <Bookmark size={16} />),
    },
  ];

  if (isLoading) {
    return <LoadingSpinnerL />;
  }

  const isProfileUserDifferentFromLoginUser = profileUserUid !== loginUser?.uid;

  if (isProfileUserDifferentFromLoginUser) {
    return <NotAccessiblePage />;
  }

  return (
    <motion.div
      variants={insertFromBottom}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
      className="mt-5 px-3"
    >
      <UserActivityHeader text="Your Activity" />
      <h4 className="mb-1 text-left text-gray-500">Interactions</h4>
      <div className="flex w-full flex-col gap-3 px-10">
        {listItems.map((item, i) => (
          <UrlLink
            href={item.href}
            target={item.target}
            clickOn={item.clickOn}
            key={item.href}
          />
        ))}
      </div>
    </motion.div>
    // <div className="mt-5 px-3">
    //   <UserActivityHeader text="Your Activity" />
    //   <h4 className="text-left text-gray-500 mb-1">Interactions</h4>
    //   <div className="flex w-full flex-col items-center justify-between gap-3 px-10">
    //     {footerListItems.map((item, i) => (
    //       <div className="flex justify-between items-center w-full hover:opacity-70 cursor-pointer" key={item.href}>
    //         <UrlLink
    //           href={item.href}
    //           target={item.target}
    //           clickOn={item.clickOn}
    //         />
    //         <MdArrowForwardIos
    //           size={16}
    //           className="text-gray-500"
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default UserActivity;
