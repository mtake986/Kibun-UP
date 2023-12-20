import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeComment, TypeEvent, TypeUserFromFirestore } from "@/types/type";
import { BiDotsVertical } from "react-icons/bi";

type Props = {
  comment: TypeComment;
  loginUser: TypeUserFromFirestore;
  eventCreatorId: string;
};
const ActionBtn = ({ comment, loginUser, eventCreatorId }: Props) => {
  const displayItems = () => {
    // todo 1: when my comment => edit, delete
    if (comment.createdBy === loginUser.uid) {
      return (
        <>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </>
      );
    }
    // todo 2: when other's comment -> nothing

    // todo 3: when user of the post => delete
    if (eventCreatorId === loginUser.uid) {
      return <DropdownMenuItem>Delete</DropdownMenuItem>;
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="mt-1 h-4 w-4">
          <BiDotsVertical className="cursor-pointer duration-300 hover:opacity-70" />
        </button>
      </DropdownMenuTrigger>
      {comment.createdBy === loginUser.uid ||
      eventCreatorId === loginUser.uid ? (
        <DropdownMenuContent>{displayItems()}</DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  );
};

export default ActionBtn;
