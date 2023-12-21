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
import useComments from "../hooks/useComments";

type Props = {
  comment: TypeComment;
  loginUser: TypeUserFromFirestore;
  eventCreatorId: string;
  eid: string;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const ActionBtn = ({
  comment,
  loginUser,
  eventCreatorId,
  eid,
  setIsUpdateMode,
}: Props) => {
  const { removeComment } = useComments();
  const displayItems = () => {
    // todo 1: when my comment => edit, delete
    if (comment.createdBy === loginUser.uid) {
      return (
        <>
          <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => setIsUpdateMode(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => removeComment(comment.id, eid)}
          >
            Delete
          </DropdownMenuItem>
        </>
      );
    }
    // todo 2: when other's comment -> nothing

    // todo 3: when user of the post => delete
    if (eventCreatorId === loginUser.uid) {
      return (
        <DropdownMenuItem
          className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
          onClick={() => removeComment(comment.id, eid)}
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
      eventCreatorId === loginUser.uid ? (
        <DropdownMenuContent className="mr-3 w-10 space-y-1 bg-white py-2 dark:bg-slate-900">
          {displayItems()}
        </DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  );
};

export default ActionBtn;
