"use client";
import CreatorInfo from "@/components/creatorInfo/creatorProfile/CreatorInfo";
import { auth } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";

const CreatorInfoPage = () => {
  const { fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);
  return (
    <div className="p-5 sm:mb-32 sm:p-0">
      <CreatorInfo />
    </div>
  );
};

export default CreatorInfoPage;
