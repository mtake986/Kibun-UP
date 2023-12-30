import CreatedDateString from "@/components/utils/CreatedDateString";
import { TypeProposal } from "@/types/type";
import React from "react";

type Props = {
  proposal: TypeProposal;
}
const ProposalCard = ({proposal}: Props) => {
  return (
    <div key={proposal.id}>
      <h1>{proposal.title}</h1>
      <p>{proposal?.description}</p>
      <p>{proposal.createdBy}</p>
      {/* create a utility component file to display a created date */}
      <CreatedDateString date={proposal.createdAt?.toDate() ?? new Date()} />
    </div>
  );
};

export default ProposalCard;
