"use client";
import React, { useEffect } from "react";
import ProposalsList from "./list/ListHome";
import ProposalForm from "./form/ProposalForm";
import useProposals from "./form/hooks/useProposals";
import LoadingSpinnerM from "../utils/LoadingSpinnerM";

const ProposalHome = () => {
  const { fetchProposals, proposals, isPending } = useProposals();

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <ProposalForm />

        <ProposalsList proposals={proposals} isPending={isPending} />

    </div>
  );
};

export default ProposalHome;
