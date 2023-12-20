import {
  TypeComment,
  TypeSelectedSortByForComments,
  TypeUserFromFirestore,
} from "@/types/type";
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
  sortOldestFirst: () => void;
  sortNewestFirst: () => void;
  selectedSortByForComments: TypeSelectedSortByForComments;
};
const CommentArea = ({
  loginUser,
  toggleAddMode,
  eid,
  comments,
  isAddMode,
  sortOldestFirst,
  sortNewestFirst,
  selectedSortByForComments,
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
        sortOldestFirst={sortOldestFirst}
        sortNewestFirst={sortNewestFirst}
        selectedSortByForComments={selectedSortByForComments}
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
