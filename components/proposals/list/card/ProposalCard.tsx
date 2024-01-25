import { TypeProposal, TypeUserFromFirestore } from "@/types/type";
import React, { useCallback, useEffect, useState } from "react";
import Content from "./Content";
import Icons from "./Icons/Icons";
import UpdateMode from "./UpdateMode";
import { AnimatePresence } from "framer-motion";
import CommentForm from "./comment/CommentForm";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import useProposalComment from "../hooks/useProposalComment";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";

type Props = {
  proposal: TypeProposal;
};
const ProposalCard = ({ proposal }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { toggleAddMode, isCommentAddMode, fetchComments, addComment, commentsOnProposal } = useProposalComment();
  const { loginUser } = useAuth();
  const creatorImg = useCallback(() => {
    if (loginUser) {
      return (
        <Image
          src={loginUser.photoURL}
          alt="profile photo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />
      );
    } else {
      return <LoadingSpinnerS />
    }
  }, []);

  useEffect(() => {
    fetchComments(proposal.id);
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
                addComment={addComment}
              />
            )}
          </AnimatePresence>
          <p>{commentsOnProposal.length}</p>
        </>
      )}
    </div>
  );
};

export default ProposalCard;
