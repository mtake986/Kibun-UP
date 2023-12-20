import {
  TypeComment,
  TypeEvent,
  TypeSelectedSortByForComments,
} from "@/types/type";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SortBtn from "./SortBtn";

type Props = {
  toggleCommentList: () => void;
  areCommentsShown: boolean;
  comments: TypeComment[];
  sortOldestFirst: () => void;
  sortNewestFirst: () => void;
  selectedSortByForComments: TypeSelectedSortByForComments;
};
const NumOfComments = ({
  toggleCommentList,
  areCommentsShown,
  comments,
  sortOldestFirst,
  sortNewestFirst,
  selectedSortByForComments,
}: Props) => {
  return (
    <div className="mt-1 flex items-center gap-3 text-gray-400">
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
      {areCommentsShown ? (
        <SortBtn
          sortOldestFirst={sortOldestFirst}
          sortNewestFirst={sortNewestFirst}
          selectedSortByForComments={selectedSortByForComments}
        />
      ) : null}
    </div>
  );
};

export default NumOfComments;
