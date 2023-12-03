"use client";
import React, { useEffect } from "react";
import UserActivityHeader from "../UserActivityHeader";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { motion } from "framer-motion";
import { insertFromRight } from "@/data/CONSTANTS";

const UserActivityLikes = () => {
  const { loginUser, fetchLoginUser } = useAuth();

  useEffect(() => {
    if (!loginUser) fetchLoginUser(auth.currentUser);
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
      <UserActivityHeader
        text="Likes"
      />
    </motion.div>
  );
};

export default UserActivityLikes;
