import Image from "next/image";
import React from "react";
import SnsIcon from "./SnsIcon";
import { mySnsInfo } from "@/public/CONSTANTS";

interface ISnsInfo {
  name: string; 
  icon: string;
  link: string;
}
const SnsIcons = () => {
  return (
    <div className="flex flex-col gap-4">
      {mySnsInfo.map((snsInfo: ISnsInfo) => (
        <SnsIcon key={snsInfo.name} snsInfo={snsInfo} />
      ))}
    </div>
  );
};

export default SnsIcons;