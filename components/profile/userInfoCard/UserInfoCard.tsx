import React from "react";
import Image from "next/image";
import { TypeLoginUser } from "@/types/type";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";

type Props = {
  profileUser: TypeLoginUser;
  numOfQuotes: number;
  numOfEvents: number;
  isPathnameSameAsLoginUser?: boolean;
};

const UserInfoCard = ({
  profileUser,
  numOfQuotes,
  numOfEvents,
  isPathnameSameAsLoginUser,
}: Props) => {
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
      value: profileUser.settings.itemsPerPage,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-10">
        <Image
          src={profileUser.photoURL || defaultProfilePhoto}
          alt="loginUser photo / default loginUser photo"
          width={100}
          height={100}
          className="h-20 w-20 rounded-full object-cover object-center text-left xs:h-36 xs:w-36 sm:h-48 sm:w-48"
        />
        <div className="flex justify-between gap-3">
          {items.map((item: { label: string; value: number }) =>
            item.label === "#/Pg." && !isPathnameSameAsLoginUser ? null : (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-lg">{item.value}</span>
                <p className="text-xs">{item.label}</p>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold">{profileUser.displayName}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
