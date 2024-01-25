import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeComment, TypeUserFromFirestore } from "@/types/type";
import { BiDotsVertical } from "react-icons/bi";
import useProposalComment from "../../../hooks/useProposalComment";
import { useAuth } from "@/context/AuthContext";

type Props = {
  comment: TypeComment;
  proposalCreatorId: string;
  proposalId: string;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  // goPrevAsNoCurrentRecords?: () => void;
};
const ActionBtn = ({
  comment,
  proposalCreatorId,
  proposalId,
  setIsUpdateMode,
}: // goPrevAsNoCurrentRecords,
Props) => {
  const { removeComment } = useProposalComment();
  const { loginUser } = useAuth();

  if (!loginUser) {
    return null;
  }

  const displayItems = () => {
    // todo 1: when my comment => edit, delete
    if (comment.createdBy === loginUser.uid) {
      return (
        <>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => setIsUpdateMode(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => {
              removeComment(comment.id, proposalId);
              // goPrevAsNoCurrentRecords && goPrevAsNoCurrentRecords();
            }}
          >
            Delete
          </DropdownMenuItem>
        </>
      );
    }
    // todo 2: when other's comment -> nothing

    // todo 3: when user of the post => delete
    if (proposalCreatorId === loginUser.uid) {
      return (
        <DropdownMenuItem
          className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
          onClick={() => removeComment(comment.id, proposalId)}
        >
          Delete
        </DropdownMenuItem>
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiDotsVertical className="h-4 w-4 cursor-pointer duration-300 hover:opacity-70" />
      </DropdownMenuTrigger>
      {comment.createdBy === loginUser.uid ||
      proposalCreatorId === loginUser.uid ? (
        <DropdownMenuContent className="mr-3 w-10 space-y-1 bg-white py-2 dark:bg-slate-900">
          {displayItems()}
        </DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  );
};

export default ActionBtn;
