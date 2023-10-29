import React, { useState } from "react";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { MdClose } from "react-icons/md";

type Props = {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const EditBtn = ({ isEditMode, setIsEditMode }: Props) => {
  return (
    <Edit
      className="absolute right-0 top-0"
      size={14}
      onClick={() => setIsEditMode((prev) => !prev)}
    />
  );
};

export default EditBtn;
