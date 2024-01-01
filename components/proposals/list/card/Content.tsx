import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeProposal } from "@/types/type";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import UrlLink from "@/components/utils/UrlLink";
import relativeDate from "@/components/utils/RelativeDate";

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
        width={24}
        height={24}
        className="mt-1 rounded-full"
      />
    );
  }, [profilePhoto]);

  return (
    <div key={proposal.id} className="flex items-start gap-2">
      <div className="flex items-center gap-3">
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
        <p className="text-sm whitespace-pre-line">{proposal?.description}</p>
        <span className="block text-right text-xs text-gray-500">
          {proposal?.updatedAt ? relativeDate(proposal.updatedAt?.toDate() ?? new Date()) + ' (edited)' : relativeDate(proposal.createdAt?.toDate() ?? new Date())}
        </span>
      </div>

      {/* create a utility component file to display a created date */}
    </div>
  );
};

export default Content;
