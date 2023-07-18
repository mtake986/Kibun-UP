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
    <div className="absolute right-0 top-0">
      <Button
        onClick={() => setIsEditMode((prev) => !prev)}
        className={` ${
          isEditMode
            ? "hover:bg-red-50 hover:text-red-500"
            : "hover:bg-blue-50 hover:text-blue-500"
        } duration-300 sm:w-auto`}
        variant="ghost"
      >
        {isEditMode ? <MdClose size={14} /> : <Edit size={14} />}
      </Button>
    </div>
  );
};

export default EditBtn;
