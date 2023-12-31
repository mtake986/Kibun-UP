import { db } from "@/config/Firebase";
import { displayErrorToast, displaySuccessToast } from "@/functions/displayToast";
import { TypeProposal } from "@/types/type";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";

const useProposals = () => {
  const [proposals, setProposals] = useState<TypeProposal[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const proposalsCollectionRef = collection(db, "proposals");

  const submitProposal = async (
    values: { title: string; description: string },
    uid: string
  ) => {
    const payload = {
      ...values,
      createdBy: uid,
      createdAt: serverTimestamp(),
      votedUpBy: [],
      status: "open",
    };
    await addDoc(proposalsCollectionRef, payload)
      .then(() => {
        displaySuccessToast({
          text: "Successfully Created",
        });
      })
      .catch((error) => {
        displayErrorToast({
          text: "Error: " + error.message,
        });
      });
  };

  const fetchProposals = async () => {
    setIsPending(true);
    const q = query(proposalsCollectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProposals(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeProposal)
        )
      );
      setIsPending(false);
    });
    return unsubscribe;
  }

  return { submitProposal, fetchProposals, proposals, isPending };


};

export default useProposals;
