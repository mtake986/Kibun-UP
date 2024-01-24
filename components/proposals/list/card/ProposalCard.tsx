import { TypeProposal } from "@/types/type";
import React, { useCallback, useState } from "react";
import Content from "./Content";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import Icons from "./Icons/Icons";
import UpdateMode from "./UpdateMode";
import useProposalCard from "./hooks/useProposalCard";
import { AnimatePresence } from "framer-motion";
import CommentForm from "./comment/CommentForm";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

type Props = {
  proposal: TypeProposal;
};
const ProposalCard = ({ proposal }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { toggleAddMode, isCommentAddMode } = useProposalCard();
  const { loginUser } = useAuth();
  const creatorImg = useCallback(() => {
    return (
      <Image
        src={loginUser?.photoURL || ""}
        alt="profile photo"
        width={40}
        height={40}
        className="rounded-full"
      />
    );
  }, []);

  return (
    <div className="relative rounded-md border px-4 py-6 dark:border-white sm:p-6">
      {isUpdateMode ? (
        <UpdateMode proposal={proposal} setIsUpdateMode={setIsUpdateMode} />
      ) : (
        <>
          <Content proposal={proposal} />
          <Icons
            proposal={proposal}
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
            toggleAddMode={toggleAddMode}
            // goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
          />
          <AnimatePresence>
            {isCommentAddMode && loginUser && (
              <CommentForm
                creatorImg={creatorImg}
                loginUser={loginUser}
                toggleAddMode={toggleAddMode}
                proposalId={proposal.id}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default ProposalCard;
