import React, { useState } from "react";

const useProposalCard = () => {
  const [isCommentAddMode, setIsCommentAddMode] = useState<boolean>(false);

  const toggleAddMode = () => {
    setIsCommentAddMode((prev) => !prev);
  };

  return { toggleAddMode, isCommentAddMode };
};

export default useProposalCard;
