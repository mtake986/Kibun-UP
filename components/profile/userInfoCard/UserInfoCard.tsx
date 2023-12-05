import React from "react";
import Image from "next/image";
import { TypeLoginUser } from "@/types/type";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";

type Props = {
  loginUser: TypeLoginUser;
  numOfQuotes: number;
  numOfEvents: number;
};

const UserInfoCard = ({ loginUser, numOfQuotes, numOfEvents }: Props) => {
  const items = [
    {
      label: "Quotes",
      value: numOfQuotes,
    },
    {
      label: "Events",
      value: numOfEvents,
    },
    {
      label: "#/Pg.",
      value: loginUser.settings.itemsPerPage,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-10">
        <Image
          src={loginUser.photoURL || defaultProfilePhoto}
          alt="loginUser photo / default loginUser photo"
          width={100}
          height={100}
          className="h-20 w-20 rounded-full object-cover object-center text-left xs:h-36 xs:w-36 sm:h-48 sm:w-48"
        />
        <div className="flex justify-between gap-3">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="text-lg">{item.value}</span>
              <p className="text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">{loginUser.displayName}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
