import { db } from "@/config/Firebase";
import { TypeComment } from "@/types/type";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
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

  // TODO: Implement removeComment functionality
  // TODO: Implement updateComment functionality

  const fetchComments = async (eid: string) => {
    const q = query(
      collection(db, "events", eid, "comments"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeComment))
      );
      // Respond to data
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
      console.log(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeComment)
        )
      );
      // Respond to data
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
    comments,
    fetchComments,
    sortOldestFirst,
  };
};

export default useComments;
