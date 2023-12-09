import React, { useState } from "react";
import Image from "next/image";
import { TypeUserFromFirestore } from "@/types/type";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";
import { MONTHS_IN_STR } from "@/data/CONSTANTS";

type Props = {
  profileUser: TypeUserFromFirestore;
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

  const [createdAt, setCreatedAt] = useState<Date>(
    profileUser.createdAt.toDate()
  );

  return (
    <>
      {/* mobile */}
      <div className="flex items-center justify-between gap-6 xs:hidden">
        <Image
          src={profileUser.photoURL || defaultProfilePhoto}
          alt="Profile User photo / default profile photo"
          width={100}
          height={100}
          className="h-24 w-24 rounded-full object-cover object-center text-left"
        />
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-lg font-semibold">{profileUser.displayName}</p>
            <p className="text-xs text-gray-500">
              Since:{" "}
              {profileUser.createdAt
                ? `${
                    MONTHS_IN_STR[createdAt.getMonth()]
                  }/${createdAt.getDate()}, 
              ${createdAt.getFullYear()}`
                : "Error"}
            </p>
          </div>
          <div className="flex justify-start gap-3">
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

      {/* tablet, pc */}
      <div className="hidden items-center gap-10 xs:flex">
        <Image
          src={profileUser.photoURL || defaultProfilePhoto}
          alt="Profile User photo / default profile photo"
          width={100}
          height={100}
          className="rounded-full object-cover object-center text-left xs:h-32 xs:w-32"
        />
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-lg font-semibold mb-1">{profileUser.displayName}</p>
            <p className="text-xs text-gray-500">
              Since:{" "}
              {profileUser.createdAt
                ? `${
                    MONTHS_IN_STR[createdAt.getMonth()]
                  }/${createdAt.getDate()}, 
              ${createdAt.getFullYear()}`
                : "Error"}
            </p>
          </div>
          <div className="flex justify-start gap-3">
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
