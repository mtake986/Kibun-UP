import { db } from "@/config/Firebase";
import { TypeComment } from "@/types/type";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import defaultProfilePhoto from "@/public/icons/defaultProfilePhoto.png";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingSpinnerXS from "./LoadingSpinnerXS";

type Props = {
  comment: TypeComment;
};
const useUserProfileImage = ({ comment }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const getCreatorPhoto = async (uid: string): Promise<string> => {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap.data()?.photoURL;
    }
    return "";
  };

  const fetchProfilePhoto = useCallback(async () => {
    const photo = await getCreatorPhoto(comment.createdBy);
    setProfilePhoto(photo);
  }, [comment.createdBy, getCreatorPhoto]);

  useEffect(() => {
    fetchProfilePhoto()
      .then(() => setIsLoading(false))
      .catch((error) => {
        displayErrorToast("Failed to fetch profile photo:", error);
        setIsLoading(false);
      });
  }, []);

  const creatorImg = () => {
    if (isLoading) return <LoadingSpinnerXS num={4} />; 
    return (
      <div className="h-4 w-4">
        <Image
          src={profilePhoto ?? defaultProfilePhoto}
          alt="profile photo"
          width={16}
          height={16}
          className="rounded-full"
        />
      </div>
    );
  };

  return { creatorImg };
};

export default useUserProfileImage;
