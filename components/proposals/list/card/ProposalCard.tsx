import {
  TypeComment,
  TypeProposal,
  TypeSelectedSortByForComments,
  TypeUserFromFirestore,
} from "@/types/type";
import React, { useCallback, useEffect, useState } from "react";
import Content from "./Content";
import Icons from "./Icons/Icons";
import UpdateMode from "./UpdateMode";
import { AnimatePresence } from "framer-motion";
import CommentForm from "./comment/CommentForm";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import useProposalComment from "../hooks/useProposalComment";
import NumOfComments from "./comment/NumOfComments";
import ToggleCommentsBtn from "./comment/ToggleCommentsBtn";
import SortBtn from "./comment/SortBtn";
import CommentList from "./comment/CommentList";
import { UserIcon } from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/config/Firebase";

type Props = {
  proposal: TypeProposal;
};
const ProposalCard = ({ proposal }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [commentsOnProposal, setCommentsOnProposal] = useState<TypeComment[]>(
    []
  );
  const [selectedSortByForComments, setSelectedSortByForComments] =
    useState<TypeSelectedSortByForComments>("newestFirst");

  const {
    toggleAddMode,
    isCommentAddMode,
    addComment,
    toggleCommentList,
    areCommentsShown,
    updateComment,
  } = useProposalComment();
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
      return <UserIcon size={16} />;
    }
  }, [loginUser]);

  useEffect(() => {
    sortByNewestFirst();
  }, []);

  const sortComments = (order: "asc" | "desc") => {
    const q = query(
      collection(db, "proposals", proposal.id, "comments"),
      orderBy("createdAt", order)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCommentsOnProposal(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeComment)
        )
      );
    });
    setSelectedSortByForComments(
      order === "asc" ? "oldestFirst" : "newestFirst"
    );
    return unsubscribe;
  };

  const sortByNewestFirst = () => sortComments("desc");
  const sortByOldestFirst = () => sortComments("asc");

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
          <div className="mb-2 mt-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <NumOfComments comments={commentsOnProposal} />
              <ToggleCommentsBtn
                areCommentsShown={areCommentsShown}
                toggleCommentList={toggleCommentList}
                commentsOnProposal={commentsOnProposal}
              />
            </div>
            <SortBtn
              commentsOnProposal={commentsOnProposal}
              sortByNewestFirst={sortByNewestFirst}
              sortByOldestFirst={sortByOldestFirst}
              selectedSortByForComments={selectedSortByForComments}
            />
          </div>
          <CommentList
            areCommentsShown={areCommentsShown}
            commentsOnProposal={commentsOnProposal}
            proposalId={proposal.id}
            proposalCreatorId={proposal.createdBy}
            updateComment={updateComment}
          />
        </>
      )}
    </div>
  );
};

export default ProposalCard;
