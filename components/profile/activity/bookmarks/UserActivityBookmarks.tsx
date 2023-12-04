'use client';
import React, { useEffect } from "react";
import UserActivityHeader from "../UserActivityHeader";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { insertFromRight } from "@/data/CONSTANTS";
import { motion } from "framer-motion";
import { useQuote } from "@/context/QuoteContext";
import ListOfBookmarks from "./ListOfBookmarks";

const UserActivityBookmarks = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const { fetchAllQuotes, allQuotes } = useQuote();
  useEffect(() => {
    if (!loginUser) fetchLoginUser(auth.currentUser);
    if (allQuotes.length === 0) fetchAllQuotes();
  }, [auth.currentUser]);

  if (!loginUser) {
    return null;
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
