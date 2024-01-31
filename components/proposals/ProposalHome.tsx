"use client";
import React, { useContext, useEffect, useState } from "react";
import ProposalsList from "./list/ListHome";
import ProposalForm from "./form/ProposalForm";
import useProposals from "./form/hooks/useProposals";
import LoadingSpinnerM from "../utils/LoadingSpinnerM";
import { TypeProposal } from "@/types/type";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/config/Firebase";

const ProposalHome = () => {
  const [proposals, setProposals] = useState<TypeProposal[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"newestFirst" | "mostVotes">(
    "newestFirst"
  );
  useEffect(() => {
    sortProposals(sortBy);
  }, []);

  const sortProposals = (ele: "newestFirst" | "mostVotes") => {

    setSortBy(ele)
    setIsPending(true);
    const q = query(collection(db, "proposals"), orderBy("createdAt", 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const temp = snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as TypeProposal)
      );
      if (ele === "mostVotes") {
        temp.sort((a, b) => b.votedBy.length - a.votedBy.length);
      }
      setProposals(temp);
    });
    setIsPending(false);
    return unsubscribe;
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-10 pb-20 sm:mb-32 sm:p-0">
      <ProposalForm />
      <ProposalsList
        proposals={proposals}
        isPending={isPending}
        sortBy={sortBy}
        sortProposals={sortProposals}
      />
    </div>
  );
};

export default ProposalHome;
