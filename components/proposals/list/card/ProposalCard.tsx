import { TypeProposal } from "@/types/type";
import React, { useState } from "react";
import Content from "./Content";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import Icons from "./Icons/Icons";
import UpdateMode from "./UpdateMode";

type Props = {
  proposal: TypeProposal;
};
const ProposalCard = ({ proposal }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false);

  return (
    <div className="relative rounded-md border px-4 py-6 dark:border-white sm:p-6">
      {isCardLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinnerS />
        </div>
      ) : (
        <>
          {isUpdateMode ? (
            <UpdateMode
              proposal={proposal}
              setIsUpdateMode={setIsUpdateMode}
              setIsCardLoading={setIsCardLoading}
            />
          ) : (
            <>
              <Content proposal={proposal} />
              <Icons
                proposal={proposal}
                setIsUpdateMode={setIsUpdateMode}
                isUpdateMode={isUpdateMode}
                // goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProposalCard;
