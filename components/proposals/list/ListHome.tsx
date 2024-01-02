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
  sortBy: "newestFirst" | "mostVotes";
  setSortBy: React.Dispatch<React.SetStateAction<"newestFirst" | "mostVotes">>;
};

const ListHome = ({ proposals, isPending, sortBy, setSortBy }: Props) => {
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
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        );
      case "inProgress":
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "inProgress"
            )}
            sortBy={sortBy} setSortBy={setSortBy}
          />
        );
      case "closed":
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "closed"
            )}
            sortBy={sortBy} setSortBy={setSortBy}
          />
        );
      default:
        return (
          <ProposalList
            proposals={proposals.filter(
              (proposal) => proposal.status === "open"
            )}
            sortBy={sortBy} setSortBy={setSortBy}
          />
        );
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <Tabs tabs={tabs} handleTabClick={handleTabClick} />
      {isPending ? <LoadingSpinnerM /> : displayList()}
    </div>
  );
};

export default ListHome;
