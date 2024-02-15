import Image from "next/image";
import React from "react";
import SnsIcon from "./SnsIcon";
import { mySnsInfo } from "@/data/CONSTANTS";
import HeadingFive from "@/components/utils/HeadingFive";

interface ISnsInfo {
  name: string;
  icon: string;
  link: string;
}
const SnsIcons = () => {
  return (
    <div>
      <HeadingFive text="Social Media" className="mb-1 text-violet-500 dark:text-gray-400" />
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 dark:bg-white px-3 py-2 rounded-md">
        {mySnsInfo.map((snsInfo: ISnsInfo) => (
          <SnsIcon key={snsInfo.name} snsInfo={snsInfo} />
        ))}
      </div>
    </div>
  );
};

export default SnsIcons;
