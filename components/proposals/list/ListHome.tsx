import CreatedDateString from "@/components/utils/CreatedDateString";
import { TypeProposal } from "@/types/type";
import React from "react";
import Tabs from "./Tabs";
import useProposalTab from "./hooks/useProposalTab";
import { useSearchParams } from "next/navigation";
import List from "./ProposalList";
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
          <List
            proposals={proposals.filter(
              (proposal) => proposal.status === "open"
            )}
          />
        );
      case "inProgress":
        return (
          <List
            proposals={proposals.filter(
              (proposal) => proposal.status === "inProgress"
            )}
          />
        );
      case "closed":
        return (
          <List
            proposals={proposals.filter(
              (proposal) => proposal.status === "closed"
            )}
          />
        );
      default:
        return (
          <List
            proposals={proposals.filter(
              (proposal) => proposal.status === "open"
            )}
          />
        );
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <Tabs tabs={tabs} handleTabClick={handleTabClick} />
      {isPending ? <LoadingSpinnerM /> : displayList()}
    </div>
  );
};

export default ListHome;
