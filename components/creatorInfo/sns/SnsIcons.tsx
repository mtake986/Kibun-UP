import Image from "next/image";
import React from "react";
import SnsIcon from "./SnsIcon";
import { mySnsInfo } from "@/public/CONSTANTS";
import HeadingFive from "@/components/utils/HeadingFive";

interface ISnsInfo {
  name: string;
  icon: string;
  link: string;
}
const SnsIcons = () => {
  return (
    <div>
      <HeadingFive text="SNSs" className="text-violet-500 mb-1" />
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {mySnsInfo.map((snsInfo: ISnsInfo) => (
          <SnsIcon key={snsInfo.name} snsInfo={snsInfo} />
        ))}
      </div>
    </div>
  );
};

export default SnsIcons;
