import { TypeComment, TypeUserFromFirestore } from "@/types/type";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import NumOfComments from "./NumOfComments";
import { useState } from "react";

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
  const [areCommentsShown, setAreCommentsShown] = useState<boolean>(false);
  const toggleCommentList = () => {
    setAreCommentsShown((prev) => !prev);
  };

  return (
    <div className="mt-5">
      {isAddMode ? (
        <CommentForm
          loginUser={loginUser}
          toggleAddMode={toggleAddMode}
          eid={eid}
        />
      ) : null}
      <NumOfComments
        toggleCommentList={toggleCommentList}
        areCommentsShown={areCommentsShown}
        comments={comments}
      />
      <CommentList
        loginUser={loginUser}
        comments={comments}
        areCommentsShown={areCommentsShown}
      />
    </div>
  );
};

export default CommentArea;
