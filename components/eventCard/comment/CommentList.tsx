import React, { useState } from "react";
import { TypeComment, TypeEvent, TypeUserFromFirestore } from "@/types/type";
import CommentCard from "./card/CommentCard";
import usePaginationTenItems from "@/components/hooks/usePaginationTenItems";
import PaginationBtns from "@/components/utils/PaginationBtns";

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
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePaginationTenItems(
    currentPage,
    comments
  );

  const goPrevAsNoCurrentRecords = () => {
    if (
      currentPage === nPages &&
      currentRecords.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const displayCards = () => {
    if (currentRecords.length >= 1) {
      return (
        <div className="flex flex-col gap-3">
          {currentRecords.map((comment, i) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              loginUser={loginUser}
              eventCreatorId={eventCreatorId}
              eid={eid}
              goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
            />
          ))}
        </div>
      );
    }
  };

  if (!areCommentsShown) return null;
  return (
    <div className="">
      {displayCards()}
      <div className="flex items-center justify-between">
        {nPages >= 2 && (
          <PaginationBtns
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default CommentList;
