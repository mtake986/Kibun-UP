import { TypeComment } from "@/types/type";
import React from "react";

type Props = {
  commentsOnProposal: TypeComment[];
};
const SortBtn = ({ commentsOnProposal }: Props) => {
  if (commentsOnProposal.length >= 2) {
    return <div>SortBtn</div>;
  } else {
    return null;
  }
};

export default SortBtn;
