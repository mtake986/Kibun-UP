import { TypeProposal } from "@/types/type";
import React from "react";
import Tabs from "./Tabs";
import useProposalTab from "./hooks/useProposalTab";
import { useSearchParams } from "next/navigation";
import ProposalList from "./ProposalList";
import LoadingSpinnerM from "@/components/utils/LoadingSpinnerM";
import { Unsubscribe } from "firebase/firestore";

type Props = {
  proposals: TypeProposal[];
  isPending: boolean;
  sortBy: "newestFirst" | "mostVotes";
  sortProposals: (ele: "newestFirst" | "mostVotes") => Unsubscribe;
};

const ListHome = ({
  proposals,
  isPending,
  sortBy,
  sortProposals,
}: Props) => {
  const { tabs, handleTabClick } = useProposalTab();
  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");
  
  const displayList = () => {
    switch (currTab) {
      case "closed":
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "closed"
            )}
            sortBy={sortBy}
            sortProposals={sortProposals}
          />
        );
      default:
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "open"
            )}
            sortBy={sortBy}
            sortProposals={sortProposals}
          />
        );
    }
  };

  return (
    <div className="flex flex-col">
      <Tabs tabs={tabs} handleTabClick={handleTabClick} />
      {isPending ? <LoadingSpinnerM /> : displayList()}
    </div>
  );
};

export default ListHome;
