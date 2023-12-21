import React, { useState } from "react";
import { TypeComment, TypeEvent, TypeUserFromFirestore } from "@/types/type";
import CommentCard from "./card/CommentCard";

type Props = {
  loginUser: TypeUserFromFirestore;
  comments: TypeComment[];
  areCommentsShown: boolean;
  eventCreatorId: string;
  eid: string;
};

const CommentList = ({
  loginUser,
  comments,
  areCommentsShown,
  eventCreatorId,
  eid,
}: Props) => {
  return (
    <div className="mt-1">
      {areCommentsShown && comments.length >= 1 ? (
        <div className="flex flex-col space-y-3">
          {comments.map((comment: TypeComment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              loginUser={loginUser}
              eventCreatorId={eventCreatorId}
              eid={eid}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CommentList;
