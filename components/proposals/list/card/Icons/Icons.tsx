import { useAuth } from "@/context/AuthContext";
import { TypeProposal } from "@/types/type";
import React, { useEffect, useState } from "react";
import IconEdit from "./IconEdit";
import IconVote from "./IconVote";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import IconTrash from "./IconTrash";

type Props = {
  proposal: TypeProposal;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateMode: boolean;
};
const Icons = ({ proposal, setIsUpdateMode, isUpdateMode }: Props) => {
  const { loginUser } = useAuth();

  const [isMine, setIsMine] = useState<boolean>(false);

  useEffect(() => {
    setIsMine(proposal.createdBy === loginUser?.uid);
  }, []);

  if (!loginUser) {
    return null; // or return some default UI
  }

  return (
    <div className="mt-5 flex items-center justify-between gap-2">
      <div className="flex items-center gap-5">
        {isMine ? (
          <IconEdit
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
          />
        ) : null}
        <IconVote proposal={proposal} loginUser={loginUser} />
      </div>
      {isMine ? (
        <IconTrash proposal={proposal} />
      ) : null}
    </div>
  );
};

export default Icons;
