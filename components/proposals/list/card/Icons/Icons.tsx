import { useAuth } from "@/context/AuthContext";
import { TypeProposal } from "@/types/type";
import IconEdit from "./IconEdit";
import IconVote from "./IconVote";
import IconTrash from "./IconTrash";

type Props = {
  proposal: TypeProposal;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateMode: boolean;
};
const Icons = ({ proposal, setIsUpdateMode, isUpdateMode }: Props) => {
  const { loginUser } = useAuth();

  if (!loginUser) return null;
  return (
    <div className="mt-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-5">
        {proposal.createdBy === loginUser?.uid ? (
          <IconEdit
            setIsUpdateMode={setIsUpdateMode}
            isUpdateMode={isUpdateMode}
          />
        ) : null}
        <IconVote proposal={proposal} loginUser={loginUser} />
      </div>
      {proposal.createdBy === loginUser?.uid ? (
        <IconTrash proposal={proposal} />
      ) : null}
    </div>
  );
};

export default Icons;