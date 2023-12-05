import React from 'react'
import EditBtn from "./EditBtn"
import ShareBtn from "./ShareBtn";
import LogOutBtn from "./LogOutBtn";

type Props = {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Actions = ({ setIsEditMode }: Props) => {
  return (
    <div className="flex gap-5 items-center">
      <EditBtn setIsEditMode={setIsEditMode} />
      {/* Might not necesary to implement now */}
      {/* <ShareBtn /> */}
      <LogOutBtn />
    </div>
  );
};

export default Actions