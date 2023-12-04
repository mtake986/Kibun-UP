import React from 'react'
import EditBtn from "./EditBtn"
import LogOutBtn from "./LogOutBtn";

type Props = {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Actions = ({ setIsEditMode }: Props) => {
  return (
    <div className="flex gap-5 items-center">
      <EditBtn setIsEditMode={setIsEditMode} />
      <LogOutBtn />
    </div>
  );
};

export default Actions