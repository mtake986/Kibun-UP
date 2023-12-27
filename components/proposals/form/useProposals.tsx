import { db } from "@/config/Firebase";
import { displaySuccessToast } from "@/functions/displayToast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from 'react'

const useProposals = () => {
  const proposalsCollectionRef = collection(db, "proposals");

  const submitProposal = async (values: {title: string, detail: string}, uid: string) => {
    const currTime = serverTimestamp();
    await addDoc(proposalsCollectionRef, {
      ...values,
      createdBy: uid,
      votedUpBy: [],
      createdAt: currTime,
    }).then(() => {
      displaySuccessToast({
        text: "Success: Created",
      });
    });
  }
  return {submitProposal};
}

export default useProposals