"use client";
import React, { useEffect, useState } from "react";
import UserActivityHeader from "../UserActivityHeader";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { motion } from "framer-motion";
import { insertFromRight } from "@/data/CONSTANTS";
import ListOfLikes from "./ListOfLikes";
import { useQuote } from "@/context/QuoteContext";
import { usePathname } from "next/navigation";
import { extractUidFromPath } from "@/functions/extractUidFromPath";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import NotAccessiblePage from "@/components/utils/NotAccessiblePage";

const UserActivityLikes = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const { allQuotes, fetchAllQuotes } = useQuote();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const profileUserUid = extractUidFromPath(pathname);

  useEffect(() => {
    if (!loginUser) fetchLoginUser(auth.currentUser);
    if (allQuotes.length === 0) fetchAllQuotes();
  }, [auth.currentUser]);

  if (!loginUser) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinnerL />;
  }

  const isProfileUserDifferentFromLoginUser = profileUserUid !== loginUser?.uid;

  if (!isProfileUserDifferentFromLoginUser) {
    return <NotAccessiblePage />;
  }

  
  return (
    <motion.div
      variants={insertFromRight}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
      className="mt-5 px-3"
    >
      <UserActivityHeader text="Likes" />
      <ListOfLikes loginUserQuotes={allQuotes} loginUser={loginUser} />
    </motion.div>
  );
};

export default UserActivityLikes;
