import { db } from "@/config/Firebase";
import { cannotFindDocInFirestore } from "@/functions/cannotFindDocInFirestore";
import {
  displayErrorToast,
  displaySuccessToast,
} from "@/functions/displayToast";
import { TypeProposal } from "@/types/type";
import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
      votedBy: [],
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

  const updateProposal = async (
    id: string,
    values: { title: string; description: string }
  ) => {
    const proposalRef = doc(db, "proposals", id);
        const quoteDocSnap = await getDoc(proposalRef);
    if (!quoteDocSnap.exists()) {

      await updateDoc(proposalRef, { ...values, updatedAt: serverTimestamp() })
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
    } else {
      cannotFindDocInFirestore("proposal");
    }
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
  };

  const addVote = async (uid: string, proposalId: string) => {
    const proposalRef = doc(db, "proposals", proposalId);
    const quoteDocSnap = await getDoc(proposalRef);
    if (quoteDocSnap.exists()) {
      await updateDoc(proposalRef, {
        votedBy: arrayUnion(uid),
      }).catch((e) => {
        displayErrorToast({
          e,
        });
      });
    } else {
      cannotFindDocInFirestore("proposal");
    }
  };
  const removeVote = async (uid: string, proposalId: string) => {
    const proposalRef = doc(db, "proposals", proposalId);
    const quoteDocSnap = await getDoc(proposalRef);
    if (quoteDocSnap.exists()) {
      await updateDoc(proposalRef, {
        votedBy: arrayRemove(uid),
      }).catch((e) => {
        displayErrorToast(e);
      });
    } else {
      cannotFindDocInFirestore("proposal");
    }
  };

    const deleteProposal = async (proposalId: string) => {
      await deleteDoc(doc(db, "proposals", proposalId));
    };

  return {
    submitProposal,
    fetchProposals,
    proposals,
    isPending,
    updateProposal,
    addVote,
    removeVote,
    deleteProposal,
  };
};

export default useProposals;
