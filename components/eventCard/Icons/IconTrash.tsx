import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { TypeEvent } from "@/types/type";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdOutlineCancel } from "react-icons/md";
import { usePathname } from "next/navigation";

type Props = {
  event: TypeEvent;
};

const IconTrash = ({ event }: Props) => {
  const { lockedEvent, handleDelete, unlockThisEvent, fetchProfileUserEvents } =
    useEvent();
  const pathname = usePathname();

  const { loginUser } = useAuth();

  const handleClick = (event: TypeEvent) => {
    handleDelete(event.id);
    if (loginUser && lockedEvent?.id === event.id)
      unlockThisEvent(loginUser.uid);
    if (loginUser && pathname.includes("profile")) {
      fetchProfileUserEvents(loginUser?.uid);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash
          size={14}
          className="cursor-pointer duration-300 hover:opacity-70"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-slate-900">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="flex items-center gap-3">
            <MdOutlineCancel size={14} />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleClick(event)}
            className="flex items-center gap-3 text-red-500"
          >
            <Trash size={14} />
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IconTrash;
