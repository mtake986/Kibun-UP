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
    <>
      {/* mobile */}
      <div className="flex items-center justify-between gap-6 xs:hidden">
        <Image
          src={profileUser.photoURL || defaultProfilePhoto}
          alt="loginUser photo / default loginUser photo"
          width={100}
          height={100}
          className="h-24 w-24 rounded-full object-cover object-center text-left"
        />
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">{profileUser.displayName}</p>
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
      </div>

      {/* more than tablet */}
      <div className="hidden items-center gap-10 xs:flex">
        <Image
          src={profileUser.photoURL || defaultProfilePhoto}
          alt="loginUser photo / default loginUser photo"
          width={100}
          height={100}
          className="rounded-full object-cover object-center text-left xs:h-32 xs:w-32"
        />
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold">{profileUser.displayName}</p>
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
      </div>
    </>
  );
};

export default UserInfoCard;
