import CreatedDateString from "@/components/utils/CreatedDateString";
import { TypeProposal } from "@/types/type";
import React from 'react'

type Props = {
  proposals: TypeProposal[],
};

const ProposalsList = ({ proposals }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {proposals.map((proposal) => (
        <div key={proposal.id}>
          <h1>{proposal.title}</h1>
          <p>{proposal?.detail}</p>
          <p>{proposal.createdBy}</p>
          {/* create a utility component file to display a created date */}
          <CreatedDateString date={proposal.createdAt?.toDate() ?? new Date()} />
        </div>
      ))}
    </div>
  );
};

export default ProposalsList