import { TypeComment, TypeEvent } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import IconEdit from "./IconEdit";
import IconLock from "./IconLock";
import IconTrash from "./IconTrash";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "@/config/Firebase";
import { displayErrorToast, displayToast } from "@/functions/displayToast";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import UrlLink from "@/components/utils/UrlLink";
import Image from "next/image";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";
import { useQuote } from "@/context/QuoteContext";
import IconLike from "./IconLike";
import { usePathname } from "next/navigation";
import { extractUidFromPath } from "@/functions/extractUidFromPath";
import IconComment from "./IconComment";
import useComments from "./hooks/useComments";
import CommentArea from "./CommentArea";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

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
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const { getCreatorPhoto } = useQuote();
  // const { fetchComments, comments } = useComments();
  const fetchProfilePhoto = useCallback(async () => {
    const photo = await getCreatorPhoto(event.createdBy);
    setProfilePhoto(photo);
  }, [event.createdBy, getCreatorPhoto]);

  useEffect(() => {
    setIsLoading(true);
    fetchLoginUser(auth.currentUser);
    const q = query(
      collection(db, "events", event.id, "comments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Respond to data
      // ...
      setComments(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeComment)
        )
      );
    });

    // Later ...

    // Stop listening to changes
    console.log("passed");

    fetchProfilePhoto()
      .then(() => setIsLoading(false))
      .catch((error) => {
        displayErrorToast("Failed to fetch profile photo:", error);
        setIsLoading(false);
      });
    return unsubscribe;
  }, []);

  const creatorImg = useCallback(() => {
    return (
      <Image
        src={profilePhoto ?? defaultProfilePhoto}
        alt="profile photo"
        width={16}
        height={16}
        className="rounded-full"
      />
    );
  }, [profilePhoto]);

  const pathname = usePathname();
  const uid = extractUidFromPath(pathname);

  if (!loginUser) {
    displayToast({ text: "No Login User", color: "red" });
    return null; // or return some default UI
  }

  const isMine = event.createdBy === loginUser?.uid;

  const toggleAddMode = () => {
    setIsAddMode((prev) => !prev);
  };

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <IconComment toggleAddMode={toggleAddMode} />
          {isMine ? (
            <IconEdit
              setIsUpdateMode={setIsUpdateMode}
              isUpdateMode={isUpdateMode}
            />
          ) : null}
          <IconLock event={event} loginUser={loginUser} />
          <IconLike event={event} loginUser={loginUser} />
        </div>
        {isMine ? (
          <IconTrash
            event={event}
            goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
          />
        ) : isLoading ? (
          <LoadingSpinnerXS num={3} />
        ) : pathname.includes(uid) ? (
          <div>{creatorImg()}</div>
        ) : (
          <UrlLink
            href={`/profile/${event.createdBy}`}
            target={"_self"}
            clickOn={creatorImg()}
            className="hover:opacity-70"
          />
        )}
      </div>

      {/* comment area */}
      <CommentArea
        loginUser={loginUser}
        toggleAddMode={toggleAddMode}
        eid={event.id}
        comments={comments}
        isAddMode={isAddMode}
      />
    </div>
  );
};

export default Icons;
