"use client";
import React, { useEffect } from "react";
import ProposalsList from "./list/ProposalsList";
import ProposalForm from "./form/ProposalForm";
import useProposals from "./hooks/useProposals";
import LoadingSpinnerM from "../utils/LoadingSpinnerM";

const Proposals = () => {
  const { fetchProposals, proposals, isPending } = useProposals();

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <ProposalForm />
      {isPending ? (
        <LoadingSpinnerM />
      ) : (
        <ProposalsList proposals={proposals} />
      )}
    </div>
  );
};

export default Proposals;
