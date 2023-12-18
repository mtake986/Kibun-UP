import { TypeComment } from "@/types/type";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
  toggleCommentList: () => void;
  areCommentsShown: boolean;
  comments: TypeComment[];
};
const NumOfComments = ({
  toggleCommentList,
  areCommentsShown,
  comments,
}: Props) => {
  return (
    <div className="mt-3 flex items-center gap-3 text-gray-400">
      <span className="text-sm">{comments.length} comments</span>
      {comments.length >= 1 ? (
        areCommentsShown ? (
          <IoIosArrowUp
            onClick={() => {
              toggleCommentList();
            }}
            size={16}
            className="cursor-pointer"
          />
        ) : (
          <IoIosArrowDown
            onClick={() => {
              toggleCommentList();
            }}
            size={16}
            className="cursor-pointer"
          />
        )
      ) : null}
    </div>
  );
};

export default NumOfComments;
