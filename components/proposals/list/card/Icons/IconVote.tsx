import useProposals from "@/components/proposals/form/hooks/useProposals";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeUserFromFirestore, TypeProposal } from "@/types/type";
import { useState } from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import { MdThumbUp } from "react-icons/md";

type Props = {
  proposal: TypeProposal;
  loginUser: TypeUserFromFirestore;
};

const IconVote = ({ proposal, loginUser }: Props) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [numOfVotes, setNumOfVotes] = useState<number>(
    proposal.votedBy ? proposal.votedBy.length : 0
  );
  const [isVoted, setIsVoted] = useState<boolean>(
    proposal.votedBy ? proposal.votedBy.includes(loginUser.uid) : false
  );

  const { addVote, removeVote } = useProposals();

  const handleClick = async (proposalId: string) => {
    setIsPending(true);
    try {
      if (isVoted) {
        setNumOfVotes((prev) => prev - 1);
        setIsVoted((prev) => !prev);
        await removeVote(loginUser.uid, proposalId);
      } else {
        setNumOfVotes((prev) => prev + 1);
        setIsVoted((prev) => !prev);
        await addVote(loginUser.uid, proposalId);
      }
    } catch (error) {
      displayErrorToast("Something went wrong. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={() => handleClick(proposal.id)}
      disabled={isPending}
      className="flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70"
    >
      {isVoted ? (
        <>
          <MdThumbUp size={14} />
          <span className={"text-xs"}>{numOfVotes}</span>
        </>
      ) : (
        <>
          <MdOutlineThumbUp size={14} />
          <span className="text-xs">{numOfVotes}</span>
        </>
      )}
    </button>
  );
};

export default IconVote;
