import {
  TypeComment,
  TypeEvent,
  TypeSelectedSortByForComments,
} from "@/types/type";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SortBtn from "./SortBtn";

type Props = {
  comments: TypeComment[];
};
const NumOfComments = ({ comments }: Props) => {
  return (
    <span className="text-xs text-gray-400">{comments.length} comments</span>
  );
};

export default NumOfComments;
