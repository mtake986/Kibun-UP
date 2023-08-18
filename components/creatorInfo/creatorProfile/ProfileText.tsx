import React from "react";

type Props = {
  type: "private" | "tech";
};
const ProfileText = ({ type }: Props) => {

  return (
    <div>
      {type === "private" ? (
        <p>Hello there!!</p>
      ) : (
        <p>fvnsoa</p>
      )}
    </div>
  );
};

export default ProfileText;
