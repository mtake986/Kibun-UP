import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeProposal } from "@/types/type";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import UrlLink from "@/components/utils/UrlLink";
import relativeDate from "@/components/utils/RelativeDate";
import { Badge } from "@/components/ui/badge";
import { twMerge } from "tailwind-merge";
import { changeTagColor } from "@/functions/functions";

type Props = {
  proposal: TypeProposal;
};
const Content = ({ proposal }: Props) => {
  const { getCreatorPhoto } = useQuote();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const fetchProfilePhoto = useCallback(async () => {
    const photo = await getCreatorPhoto(proposal.createdBy);
    setProfilePhoto(photo);
  }, [proposal.createdBy, getCreatorPhoto]);

  useEffect(() => {
    setIsPending(true);
    fetchProfilePhoto()
      .then(() => setIsPending(false))
      .catch((error) => {
        displayErrorToast("Failed to fetch profile photo:", error);
        setIsPending(false);
      });
  }, []);

  const creatorImg = useCallback(() => {
    return (
      <Image
        src={profilePhoto ?? defaultProfilePhoto}
        alt="profile photo"
        width={20}
        height={20}
        className="rounded-full"
      />
    );
  }, [profilePhoto]);

  return (
    <div key={proposal.id} className="">
      {/* <div className="flex items-center gap-3">
        {isPending ? (
          <div className="h-4 w-4">
            <LoadingSpinnerS />
          </div>
        ) : (
          <UrlLink
            href={`/profile/${proposal.createdBy}`}
            target={"_self"}
            clickOn={creatorImg()}
            className="hover:opacity-70"
          />
        )}
      </div>
      <div className="w-full">
        <h1 className="text-lg">{proposal?.title}</h1>
        <p className="whitespace-pre-line text-sm">{proposal?.description}</p>
        {proposal.labels && proposal.labels?.length >= 1 && (
          <div className="my-2 flex flex-wrap items-center gap-2">
            {proposal.labels.map((tag: string, i: number) => (
              <Badge
                key={tag}
                className={twMerge(
                  "border-none font-light",
                  tag === "bug"
                    ? "bg-red-500 text-white"
                    : tag === "enhancement"
                    ? "bg-green-600 text-white"
                    : "bg-gray-500 text-white"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <span className="block text-right text-xs text-gray-500">
          {proposal?.updatedAt
            ? relativeDate(proposal.updatedAt?.toDate() ?? new Date()) +
              " (edited)"
            : relativeDate(proposal.createdAt?.toDate() ?? new Date())}
        </span>
      </div> */}
      <div className="mb-2 flex items-center gap-3">
        <div className="flex items-center">
          {/* {isPending ? (
            <LoadingSpinnerS />
          ) : (
            <UrlLink
              href={`/profile/${proposal.createdBy}`}
              target={"_self"}
              clickOn={creatorImg()}
              className="hover:opacity-70"
            />
          )} */}
          <div className="flex h-5 w-5">
            <UrlLink
              href={`/profile/${proposal.createdBy}`}
              target={"_self"}
              clickOn={creatorImg()}
              className="hover:opacity-70"
            />
          </div>
        </div>
        <h1 className="text-lg">{proposal?.title}</h1>
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="whitespace-pre-line text-sm">{proposal?.description}</p>
        {proposal.labels && proposal.labels?.length >= 1 && (
          <div className="flex flex-wrap items-center gap-2">
            {proposal.labels.map((tag: string, i: number) => (
              <Badge
                key={tag}
                className={twMerge(
                  "border-none font-light",
                  tag === "bug"
                    ? "bg-red-500 text-white"
                    : tag === "enhancement"
                    ? "bg-green-600 text-white"
                    : "bg-gray-500 text-white"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <span className="block text-right text-xs text-gray-500">
          {proposal?.updatedAt
            ? relativeDate(proposal.updatedAt?.toDate() ?? new Date()) +
              " (edited)"
            : relativeDate(proposal.createdAt?.toDate() ?? new Date())}
        </span>
      </div>
    </div>
  );
};

export default Content;
