// "use client";
import CreatorImage from "@/components/creatorInfo/creatorProfile/CreatorImage";

import NationalityText from "@/components/creatorInfo/creatorProfile/NationalityText";
import TechStack from "@/components/creatorInfo/creatorProfile/TechStack";
import Files from "@/components/creatorInfo/files/Files";
import SnsIcons from "@/components/creatorInfo/sns/SnsIcons";
import HeadingFour from "@/components/utils/HeadingFour";
import HeadingTwo from "@/components/utils/HeadingTwo";
import React, { useEffect } from "react";

const CreatorInfo = () => {
  return (
    <div className="p-5 sm:mb-32 sm:p-0 xs:p-10 xs:mb-0 mb-20">
      <HeadingTwo text="Creator Info" className="sm:mb-8" />
      <div className="flex flex-col items-center justify-between gap-5 xs:flex-row xs:justify-center xs:gap-10">
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

export default CreatorInfo;
