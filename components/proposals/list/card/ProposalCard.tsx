import CreatedDateString from "@/components/utils/CreatedDateString";
import { TypeProposal } from "@/types/type";
import React, { useState } from "react";
import Content from "./Content";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import Icons from "./Icons/Icons";

type Props = {
  proposal: TypeProposal;
}
const ProposalCard = ({proposal}: Props) => {
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
            // <EditModeOn
            //   q={q}
            //   setIsUpdateMode={setIsUpdateMode}
            //   setIsCardLoading={setIsCardLoading}
            // />
            <div>update mode</div>
          ) : (
            <Content proposal={proposal} />
          )}
          <Icons
            proposal={proposal}
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
            // goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
          />
        </>
      )}
    </div>
  );
};

export default ProposalCard;
