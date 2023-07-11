import React, { useState } from "react";
import UserInfoCard from "./UserInfoCard";
import EditMode from "./EditMode";
import EditBtn from "./EditBtn";

const Profile = () => {
  const [photoURL, setPhotoURL] = React.useState<File | null>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <div className="relative my-10 flex flex-col items-center gap-5 px-5">
      {isEditMode ? (
        <EditMode setIsEditMode={setIsEditMode} />
      ) : (
        <UserInfoCard />
      )}
      <EditBtn isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
    </div>
  );
};

export default Profile;
