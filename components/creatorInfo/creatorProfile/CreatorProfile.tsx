"use client";
import Image from "next/image";
import React, { useState } from "react";

import creatorPicture from "../../../public/assets/images/creatorPicture.jpg";
import ProfileText from "./ProfileText";
import { Button } from "../../ui/button";

const CreatorProfile = () => {
  const [type, setType] = useState<"private" | "tech">("private");

  const toggleType = () => {
    if (type === "private") setType("tech");
    else setType("private");
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3">
      <Image
        src={creatorPicture}
        alt="Creator Profile Picture"
        className="m-auto h-40 w-40 rounded-full object-cover object-center sm:h-60 sm:w-60"
        width={400}
        height={400}
      />
      <h4 className="text-center text-lg font-semibold">Masahiro Takechi</h4>
      <p>
        Nationality: <span className="font-[600]">Japan</span>
      </p>
      <ProfileText type={type} />
      <Button variant="outline" onClick={() => toggleType()}>
        {type === "private" ? "Tech" : "Private"}
      </Button>
    </div>
  );
};

export default CreatorProfile;
