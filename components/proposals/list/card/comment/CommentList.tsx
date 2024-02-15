import { TypeComment, TypeUserFromFirestore } from "@/types/type";
import React from "react";
import CommentCard from "./card/CommentCard";

type Props = {
  commentsOnProposal: TypeComment[];
  areCommentsShown: boolean;
  proposalId: string;
  proposalCreatorId: string;
  updateComment: (
    commentId: string,
    updatedComment: string,
    proposalId: string
  ) => Promise<void>;
};
const CommentList = ({
  commentsOnProposal,
  areCommentsShown,
  proposalId,
  proposalCreatorId,
}: Props) => {
  if (areCommentsShown) {
    return (
      <div className="flex flex-col gap-2">
        {commentsOnProposal.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            proposalCreatorId={proposalCreatorId}
            proposalId={proposalId}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default CommentList;
