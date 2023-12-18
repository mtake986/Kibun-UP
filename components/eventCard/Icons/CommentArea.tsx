import { TypeComment, TypeUserFromFirestore } from "@/types/type";
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type Props = {
  loginUser: TypeUserFromFirestore;
  toggleAddMode: () => void;
  eid: string;
  comments: TypeComment[];
  isAddMode: boolean;
};
const CommentArea = ({
  loginUser,
  toggleAddMode,
  eid,
  comments,
  isAddMode,
}: Props) => {
  return (
    <div className="mt-5">
      {isAddMode ? (
        <CommentForm
          loginUser={loginUser}
          toggleAddMode={toggleAddMode}
          eid={eid}
        />
      ) : null}
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentArea;
