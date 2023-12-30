import CreatedDateString from "@/components/utils/CreatedDateString";
import { TypeProposal } from "@/types/type"
import React from 'react'

type Props = {
  proposals: TypeProposal[];
}
const ProposalList = ({ proposals }: Props) => {
  return (
    <div>
      {proposals.map((proposal) => (
        <div key={proposal.id}>
          <h1>{proposal.title}</h1>
          <p>{proposal?.description}</p>
          <p>{proposal.createdBy}</p>
          {/* create a utility component file to display a created date */}
          <CreatedDateString date={proposal.createdAt?.toDate() ?? new Date()} />
        </div>
      ))}
    </div>
  )
};

export default ProposalList