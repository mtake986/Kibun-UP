"use client";
import CreatorImage from "@/components/creatorInfo/creatorProfile/CreatorImage";

import NationalityText from "@/components/creatorInfo/creatorProfile/NationalityText";
import TechStack from "@/components/creatorInfo/creatorProfile/TechStack";
import Files from "@/components/creatorInfo/files/Files";
import SnsIcons from "@/components/creatorInfo/sns/SnsIcons";
import HeadingFour from "@/components/utils/HeadingFour";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { auth } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";

const CreatorInfoPage = () => {
  const { fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);
  return (
    <div className="p-10 sm:mb-32 sm:p-0">
      <HeadingTwo text="Creator Info" />
      <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div>
          <CreatorImage />
          <HeadingFour text="Masahiro Takechi" className="mb-0 mt-3 sm:mb-0" />
          <NationalityText />
        </div>
        <div className="flex flex-col items-center gap-5">
          <TechStack />
          <Files />
          <SnsIcons />
        </div>
      </div>
    </div>
  );
};

export default CreatorInfoPage;
