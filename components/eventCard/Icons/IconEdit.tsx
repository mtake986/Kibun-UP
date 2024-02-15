import { Edit } from "lucide-react";
import React from "react";

type Props = {
  setIsUpdateMode: (boo: boolean) => void;
  isUpdateMode: boolean;
};

const IconEdit = ({ setIsUpdateMode, isUpdateMode }: Props) => {
  return (
    <Edit
      size={14}
      onClick={() => setIsUpdateMode(!isUpdateMode)}
      className="cursor-pointer duration-300 hover:opacity-70"
    />
  );
};

export default IconEdit;
