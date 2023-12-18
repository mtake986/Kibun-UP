import React, { useState } from "react";
import NumOfComments from "./NumOfComments";
import { TypeComment } from "@/types/type";

type Props = {
  comments: TypeComment[];
};
const CommentList = ({ comments }: Props) => {
  const [areCommentsShown, setAreCommentsShown] = useState<boolean>(false);

  const toggleCommentList = () => {
    setAreCommentsShown((prev) => !prev);
  };

  return (
    <div>
      <NumOfComments
        toggleCommentList={toggleCommentList}
        areCommentsShown={areCommentsShown}
        comments={comments}
      />
      {areCommentsShown && comments.length >= 1 ? (
        <div className="mt-1">
          {comments.map((comment) => (
            <div key={comment.id}>{comment.comment}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CommentList;
