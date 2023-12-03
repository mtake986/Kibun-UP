'use client';
import React, { useEffect } from "react";
import UserActivityHeader from "../UserActivityHeader";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { insertFromRight } from "@/data/CONSTANTS";
import { motion } from "framer-motion";

const UserActivityBookmarks = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!loginUser) fetchLoginUser(user);
  }, [user, fetchLoginUser]);

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
    </motion.div>
  );
};

export default UserActivityBookmarks;
