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
import { useState } from "react";

const useComments = () => {
  const [comments, setComments] = useState<TypeComment[]>([]);
  
  const addComment = async (uid: string, comment: string, eid: string) => {
    const currTime = serverTimestamp();
    await addDoc(collection(db, "events", eid, "comments"), {
      createdBy: uid,
      comment,
      createdAt: currTime,
    });
  };

  const removeComment = async (commentId: string, eid: string) => {
    const commentRef = doc(db, "events", eid, "comments", commentId);

    await deleteDoc(commentRef);
  };

  const updateComment = async (
    commentId: string,
    updatedComment: string,
    eid: string
  ) => {
    const commentRef = doc(db, "events", eid, "comments", commentId);

    await updateDoc(commentRef, {
      comment: updatedComment,
      updatedAt: serverTimestamp(),
    });
  };

  const fetchComments = async (eid: string) => {
    const q = query(
      collection(db, "events", eid, "comments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeComment)
        )
      );
    });

    return unsubscribe;
  };

  const sortOldestFirst = async (eid: string) => {
    const q = query(
      collection(db, "events", eid, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeComment)
        )
      );
    });

    return unsubscribe;
  };

  return {
    addComment,
    removeComment,
    updateComment,
    comments,
    fetchComments,
    sortOldestFirst,
  };
};

export default useComments;
