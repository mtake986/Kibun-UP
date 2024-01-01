import { TypeProposal } from "@/types/type";
import React from "react";
import Tabs from "./Tabs";
import useProposalTab from "./hooks/useProposalTab";
import { useSearchParams } from "next/navigation";
import ProposalList from "./ProposalList";
import LoadingSpinnerM from "@/components/utils/LoadingSpinnerM";

type Props = {
  proposals: TypeProposal[];
  isPending: boolean;
};

const ListHome = ({ proposals, isPending }: Props) => {
  const { tabs, handleTabClick } = useProposalTab();
  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  const displayList = () => {
    switch (currTab) {
      case "open":
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "open"
            )}
          />
        );
      case "inProgress":
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "inProgress"
            )}
          />
        );
      case "closed":
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "closed"
            )}
          />
        );
      default:
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "open"
            )}
          />
        );
    }
  };
  return (
    <div>
      <Tabs tabs={tabs} handleTabClick={handleTabClick} />
      {isPending ? <LoadingSpinnerM /> : displayList()}
    </div>
  );
};

export default ListHome;
