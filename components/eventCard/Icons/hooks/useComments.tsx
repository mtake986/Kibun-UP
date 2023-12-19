import { db } from "@/config/Firebase";
import { TypeComment } from "@/types/type";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const useComments = () => {
  const [comments, setComments] = useState<TypeComment[]>([]);
  const [eid, setEid] = useState<string | null>(null);

  const addComment = async (uid: string, comment: string, eid: string) => {
    const currTime = serverTimestamp();
    await addDoc(collection(db, "events", eid, "comments"), {
      createdBy: uid,
      comment,
      createdAt: currTime,
    });
    setEid(eid);
  };

  // TODO: Implement removeComment functionality
  // TODO: Implement updateComment functionality

  const fetchComments = async (eid: string) => {
    const commentsRef = collection(db, "events", eid, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const tempComments: TypeComment[] = [];
    querySnapshot.forEach((doc) => {
      tempComments.push({ ...doc.data(), id: doc.id } as TypeComment);
    });
    setComments(tempComments);
    console.log(comments.length);
  };

  return {
    addComment,
    fetchComments,
    comments,
  };
};

export default useComments;
