"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import creatorPicture from "../../../public/creatorPicture.jpg";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";

const CreatorImage = () => {
  const { fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);

  return (
    <Image
      src={creatorPicture}
      alt="Creator Profile Picture"
      width={120}
      height={120}
      className="m-auto w-40 h-40 rounded-full object-cover object-center sm:h-60 sm:w-60"
    />
  );
};

export default CreatorImage;
