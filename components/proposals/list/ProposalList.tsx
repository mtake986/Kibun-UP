import CreatedDateString from "@/components/utils/CreatedDateString";
import { TypeProposal } from "@/types/type";
import React from "react";
import NoData from "./NoData";
import ProposalCard from "./card/ProposalCard";

type Props = {
  proposals: TypeProposal[];
};
const ProposalList = ({ proposals }: Props) => {
  if (proposals.length === 0) return <NoData />;
  return (
    <div className="flex flex-col gap-2">
      {proposals.map((proposal) => (
        <ProposalCard proposal={proposal} key={proposal.id} />
      ))}
    </div>
  );
};

export default ProposalList;
