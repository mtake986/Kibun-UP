import { TypeQuote } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import IconEdit from "./IconEdit";
import IconLock from "./IconLock";
import IconLike from "./IconLike";
import IconBookmark from "./IconBookmark";
import IconTrash from "./IconTrash";
import Image from "next/image";
import { useQuote } from "@/context/QuoteContext";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import UrlLink from "@/components/utils/UrlLink";
import { displayErrorToast } from "@/functions/displayToast";

type Props = {
  q: TypeQuote;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateMode: boolean;
  goPrevAsNoCurrentRecords?: () => void;
};

const Icons = ({
  q,
  setIsUpdateMode,
  isUpdateMode,
  goPrevAsNoCurrentRecords,
}: Props) => {
  const { loginUser } = useAuth();
  const { getCreatorPhoto } = useQuote();

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMine, setIsMine] = useState<boolean>(false);
  const [isAPI, setIsAPI] = useState<boolean>(false);

  const fetchProfilePhoto = useCallback(async () => {
    const photo = await getCreatorPhoto(q.createdBy);
    setProfilePhoto(photo);
  }, [q.createdBy, getCreatorPhoto]);

  useEffect(() => {
    setIsLoading(true);
    setIsMine(q.createdBy === loginUser?.uid);
    setIsAPI(q.createdBy === "api");
    fetchProfilePhoto()
      .then(() => setIsLoading(false))
      .catch((error) => {
        displayErrorToast("Failed to fetch profile photo:", error);
        setIsLoading(false);
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

  if (!loginUser) {
    return null; // or return some default UI
  }

  return (
    <div className="mt-5 flex items-center justify-between gap-2">
      <div className="flex items-center gap-5">
        {isMine ? (
          <IconEdit
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
          />
        ) : null}
        <IconLock q={q} loginUser={loginUser} />
        <IconLike q={q} loginUser={loginUser} />
        <IconBookmark q={q} loginUser={loginUser} />
      </div>
      {isMine ? (
        <IconTrash q={q} goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords} />
      ) : isAPI ? null : isLoading ? (
        <LoadingSpinnerXS num={3} />
      ) : (
        <UrlLink
          href={`/profile/${q.createdBy}`}
          target={"_self"}
          clickOn={creatorImg()}
          className="hover:opacity-70"
        />
      )}
    </div>
  );
};

export default Icons;
