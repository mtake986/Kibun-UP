import React from 'react'
import ProposalsList from "./list/ProposalsList"
import ProposalForm from "./form/ProposalForm"
import Subtitle from "./subtitle/Subtitle"

const Proposals = () => {
  return (
    <div className="flex flex-col gap-5">
      <Subtitle />
      <ProposalForm />
      <ProposalsList />
    </div>
  )
}

export default Proposals