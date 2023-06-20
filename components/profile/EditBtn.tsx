import React, { useState } from "react";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import EditProfileModal from "./EditProfileModal";

const EditBtn = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        onClick={() => handleOpen()}
        className={`duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
        variant="ghost"
      >
        <Edit size={14} className="mr-2" />
        Edit
      </Button>
      <EditProfileModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default EditBtn;
