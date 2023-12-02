"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import UserActivityHeader from "./UserActivityHeader";

const UserActivity = () => {
  const { loginUser } = useAuth();
  
  if (!loginUser) {
    return null;
  }
  
  return (
    <div className="mt-5">
      <UserActivityHeader loginUser={loginUser}/>
    </div>
  );
};

export default UserActivity;
