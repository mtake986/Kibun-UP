"use client";
import React, { useEffect, useState } from "react";
import UserActivityHeader from "../UserActivityHeader";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { insertFromRight } from "@/data/CONSTANTS";
import { motion } from "framer-motion";
import { useQuote } from "@/context/QuoteContext";
import ListOfBookmarks from "./ListOfBookmarks";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import { usePathname } from "next/navigation";
import { extractUidFromPath } from "@/functions/extractUidFromPath";
import NotAccessiblePage from "@/components/utils/NotAccessiblePage";

const UserActivityBookmarks = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const { fetchAllQuotes, allQuotes } = useQuote();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const profileUserUid = extractUidFromPath(pathname);

  useEffect(() => {
    const fetchDocs = async () => {
      if (!loginUser) await fetchLoginUser(auth.currentUser);
      if (allQuotes.length === 0) await fetchAllQuotes();
    };
    try {
      setIsLoading(true);
      fetchDocs();
    } catch (error) {
      console.error("An error occurred while fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  }, [auth.currentUser]);

  if (!loginUser) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinnerL />;
  }

  const isProfileUserDifferentFromLoginUser = profileUserUid !== loginUser?.uid;

  if (isProfileUserDifferentFromLoginUser) {
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
      <UserActivityHeader text="Bookmarks" />
      <ListOfBookmarks loginUserQuotes={allQuotes} loginUser={loginUser} />
    </motion.div>
  );
};

export default UserActivityBookmarks;
