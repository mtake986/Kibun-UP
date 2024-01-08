"use client";
import React, { useEffect, useState } from "react";
import ProposalsList from "./list/ListHome";
import ProposalForm from "./form/ProposalForm";
import useProposals from "./form/hooks/useProposals";
import LoadingSpinnerM from "../utils/LoadingSpinnerM";

const ProposalHome = () => {
  const {
    fetchProposals,
    proposals,
    isPending,
    sortProposals,
    sortBy,
    setSortBy,
  } = useProposals();
  
  useEffect(() => {
    fetchProposals();
    // if (sortBy === "mostVotes") sortProposals(sortBy);
  }, [sortBy]); 

  return (
    <div className="flex flex-col gap-5 px-5 py-10 pb-20 sm:mb-32 sm:p-0">
      <ProposalForm />
      <ProposalsList
        proposals={proposals}
        isPending={isPending}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
};

export default ProposalHome;
