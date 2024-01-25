import React, { useState } from "react";
import { db } from "@/config/Firebase";
import { TypeComment } from "@/types/type";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const useProposalComment = () => {
  const [isCommentAddMode, setIsCommentAddMode] = useState<boolean>(false);

  const toggleAddMode = () => {
    setIsCommentAddMode((prev) => !prev);
  };

  const [commentsOnProposal, setCommentsOnProposal] = useState<TypeComment[]>([]);

  const addComment = async (uid: string, comment: string, proposalId: string) => {
    const currTime = serverTimestamp();
    await addDoc(collection(db, "proposals", proposalId, "comments"), {
      createdBy: uid,
      comment,
      createdAt: currTime,
    });
  };

  // const removeComment = async (commentId: string, proposalId: string) => {
  //   const commentRef = doc(db, "events", proposalId, "comments", commentId);
  //   await deleteDoc(commentRef);
  // };

  // const updateComment = async (
  //   commentId: string,
  //   updatedComment: string,
  //   proposalId: string
  // ) => {
  //   const commentRef = doc(db, "events", proposalId, "comments", commentId);

  //   await updateDoc(commentRef, {
  //     comment: updatedComment,
  //     updatedAt: serverTimestamp(),
  //   });
  // };

  const fetchComments = async (proposalId: string) => {
    const q = query(
      collection(db, "proposals", proposalId, "comments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCommentsOnProposal(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeComment)
        )
      );
    });

    return unsubscribe;
  };

  return {
    toggleAddMode,
    isCommentAddMode,
    addComment,
    fetchComments,
    commentsOnProposal,
  };
};

export default useProposalComment;
