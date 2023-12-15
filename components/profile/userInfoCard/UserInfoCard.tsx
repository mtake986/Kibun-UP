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

  const createdAtDate = profileUser.createdAt.toDate() ?? undefined;

  return (
    <>
      {/* mobile */}
      <div className="flex flex-col xs:hidden">
        <div className="flex items-center gap-6">
          <Image
            src={profileUser.photoURL || defaultProfilePhoto}
            alt="Profile User photo / default profile photo"
            width={100}
            height={100}
            className="h-24 w-24 rounded-full object-cover object-center text-left"
          />
          <div className="flex flex-col gap-1">
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
        <div>
          <p className="text-sm font-semibold mt-2">{profileUser.displayName}</p>
          <p className="text-[10px] text-gray-500">
            Since:{" "}
            {createdAtDate
              ? `${
                  MONTHS_IN_STR[createdAtDate.getMonth()]
                } ${createdAtDate.getDate()}, 
              ${createdAtDate.getFullYear()}`
              : "Error"}
          </p>
        </div>
        <p className="mt-2 text-xs">{profileUser.description}</p>
      </div>

      {/* tablet, pc */}
      <div className="hidden xs:flex xs:flex-col">
        <div className="flex items-center gap-10">
          <Image
            src={profileUser.photoURL || defaultProfilePhoto}
            alt="Profile User photo / default profile photo"
            width={100}
            height={100}
            className="rounded-full object-cover object-center text-left xs:h-32 xs:w-32"
          />
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1 text-lg font-semibold">
                {profileUser.displayName}
              </p>
              <p className="text-xs text-gray-500">
                Since:{" "}
                {createdAtDate
                  ? `${
                      MONTHS_IN_STR[createdAtDate.getMonth()]
                    } ${createdAtDate.getDate()}, 
              ${createdAtDate.getFullYear()}`
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
        <p className="mt-2">{profileUser.description}</p>
      </div>
    </>
  );
};

export default UserInfoCard;
