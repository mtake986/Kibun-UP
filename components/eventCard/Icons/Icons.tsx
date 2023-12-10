import { TypeEvent } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import IconEdit from "./IconEdit";
import IconLock from "./IconLock";
import IconTrash from "./IconTrash";
import { useCallback, useEffect, useState } from "react";
import { auth } from "@/config/Firebase";
import { displayErrorToast, displayToast } from "@/functions/displayToast";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import UrlLink from "@/components/utils/UrlLink";
import Image from "next/image";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";
import { useQuote } from "@/context/QuoteContext";

type Props = {
  event: TypeEvent;
  setIsUpdateMode: (boo: boolean) => void;
  isUpdateMode: boolean;
  goPrevAsNoCurrentRecords?: () => void;
};

const Icons = ({
  event,
  setIsUpdateMode,
  isUpdateMode,
  goPrevAsNoCurrentRecords,
}: Props) => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const { getCreatorPhoto } = useQuote();

  const fetchProfilePhoto = useCallback(async () => {
    const photo = await getCreatorPhoto(event.createdBy);
    setProfilePhoto(photo);
  }, [event.createdBy, getCreatorPhoto]);

  useEffect(() => {
    setIsLoading(true);
    fetchLoginUser(auth.currentUser);
    fetchProfilePhoto()
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  if (!loginUser) {
    displayToast({ text: "No Login User", color: "red" });
    return null; // or return some default UI
  }


  const creatorImg = () => {
    return (
      <Image
        src={profilePhoto ?? defaultProfilePhoto}
        alt="profile photo"
        width={20}
        height={20}
        className="rounded-full"
      />
    );
  };

  const isMine = event.createdBy === loginUser?.uid;
  return (
    <div className="mt-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        {isMine ? (
          <IconEdit
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
          />
        ) : null}
        <IconLock event={event} loginUser={loginUser} />
        {/* <IconLike q={q} loginUser={loginUser} /> */}
      </div>
      {isMine ? (
        <IconTrash
          event={event}
          goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
        />
      ) : isLoading ? (
        <LoadingSpinnerXS num={3} />
      ) : (
        <UrlLink
          href={`/profile/${event.createdBy}`}
          target={"_self"}
          clickOn={creatorImg()}
          className="hover:opacity-70"
        />
      )}
    </div>
  );
};

export default Icons;
