import { TypeEvent, TypeUserFromFirestore } from "@/types/type";
import React, { useState } from "react";
import { BiComment } from "react-icons/bi";

type Props = {
  toggleAddMode: () => void;
};

const IconComment = ({ toggleAddMode }: Props) => {
  return (
    <BiComment
      onClick={toggleAddMode}
      className="cursor-pointer duration-300 hover:opacity-70"
    />
  );
};

export default IconComment;
