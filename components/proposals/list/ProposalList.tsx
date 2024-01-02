import { TypeProposal } from "@/types/type";
import React, { useState } from "react";
import ProposalCard from "./card/ProposalCard";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import usePaginationTenItems from "@/components/hooks/usePaginationTenItems";
import Modal from "./modal/Modal";
import ElementSelect from "./modal/sort/ElementSelect";
import useProposals from "../form/hooks/useProposals";

type Props = {
  proposals: TypeProposal[];
  sortBy: "newestFirst" | "mostVotes";
  setSortBy: React.Dispatch<React.SetStateAction<"newestFirst" | "mostVotes">>;
};
const ProposalList = ({ proposals, sortBy, setSortBy }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { nPages, currentRecords } = usePaginationTenItems(
    currentPage,
    proposals
  );

  const goPrevAsNoCurrentRecords = () => {
    if (
      currentPage === nPages &&
      currentRecords.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const displayCards = () => {
    if (currentRecords.length >= 1) {
      return (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc, i) => (
            <ProposalCard
              proposal={doc}
              key={doc.id}
              // goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between">
        {nPages >= 2 && (
          <PaginationBtns
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        {/* <Modal sortBy={sortBy} setSortBy={setSortBy} /> */}
      </div>
      <div className="mb-2 flex items-center gap-3 text-gray-400">
        <p>{proposals.length} proposals found</p>
        <ElementSelect sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      {displayCards()}
    </div>
  );
};

export default ProposalList;
