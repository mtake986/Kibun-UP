import {
  TypeComment,
  TypeEvent,
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
  event: TypeEvent;
  comments: TypeComment[];
  isAddMode: boolean;
  sortOldestFirst: () => void;
  sortNewestFirst: () => void;
  selectedSortByForComments: TypeSelectedSortByForComments;
};
const CommentArea = ({
  loginUser,
  toggleAddMode,
  event,
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
          eid={event.id}
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
        eventCreatorId={event.createdBy}
        eid={event.id}
      />
    </div>
  );
};

export default CommentArea;
