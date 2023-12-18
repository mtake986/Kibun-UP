import React, { useState } from "react";
import { TypeComment, TypeUserFromFirestore } from "@/types/type";
import CommentCard from "./CommentCard";

type Props = {
  loginUser: TypeUserFromFirestore;
  comments: TypeComment[];
  areCommentsShown: boolean;
};
const CommentList = ({ loginUser, comments, areCommentsShown }: Props) => {
  return (
    <div className="mt-1">
      {areCommentsShown && comments.length >= 1 ? (
        <div className="mt-1 space-y-3">
          {comments.map((comment: TypeComment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              loginUser={loginUser}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CommentList;
