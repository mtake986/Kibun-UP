import { TypeComment } from "@/types/type";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
  areCommentsShown: boolean;
  toggleCommentList: () => void;
  commentsOnProposal: TypeComment[];
};
const ToggleCommentsBtn = ({
  areCommentsShown,
  toggleCommentList,
  commentsOnProposal,
}: Props) => {
  if (commentsOnProposal.length > 0) {
    if (areCommentsShown) {
      return (
        <IoIosArrowUp
          onClick={toggleCommentList}
          size={12}
          className="cursor-pointer text-gray-400"
        />
      );
    } else {
      return (
        <IoIosArrowDown
          onClick={toggleCommentList}
          size={12}
          className="cursor-pointer text-gray-400"
        />
      );
    }
  } else {
    return null;
  }
};

export default ToggleCommentsBtn;
