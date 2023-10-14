import { Edit } from "lucide-react";
import React from 'react'


type Props = {
  setIsUpdateMode: (boo: boolean) => void;
};

const IconEdit = ({ setIsUpdateMode } : Props) => {
  return (
    <Edit
      size={14}
      onClick={() => setIsUpdateMode(true)}
      className="cursor-pointer duration-300 hover:opacity-50"
    />
  );
};

export default IconEdit