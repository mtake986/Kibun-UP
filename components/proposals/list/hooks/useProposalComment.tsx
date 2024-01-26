import React, { useState } from "react";
import { db } from "@/config/Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const useProposalComment = () => {
  const [isCommentAddMode, setIsCommentAddMode] = useState<boolean>(false);
  const [areCommentsShown, setAreCommentsShown] = useState<boolean>(false);

  const toggleAddMode = () => {
    setIsCommentAddMode((prev) => !prev);
  };

  const toggleCommentList = () => {
    setAreCommentsShown((prev) => !prev);
  }


  const addComment = async (uid: string, comment: string, proposalId: string) => {
    const currTime = serverTimestamp();
    await addDoc(collection(db, "proposals", proposalId, "comments"), {
      createdBy: uid,
      comment,
      createdAt: currTime,
    });
  };

  const removeComment = async (commentId: string, proposalId: string) => {
    const commentRef = doc(db, "proposals", proposalId, "comments", commentId);
    await deleteDoc(commentRef);
  };

  const updateComment = async (
    commentId: string,
    updatedComment: string,
    proposalId: string
  ) => {
    const commentRef = doc(db, "proposals", proposalId, "comments", commentId);

    await updateDoc(commentRef, {
      comment: updatedComment,
      updatedAt: serverTimestamp(),
    });
  };

  return {
    toggleAddMode,
    isCommentAddMode,
    addComment,
    toggleCommentList,
    areCommentsShown,
    removeComment,
    updateComment,
  };
};

export default useProposalComment;
