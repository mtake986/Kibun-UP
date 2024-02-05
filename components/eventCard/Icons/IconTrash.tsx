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
  goPrevAsNoCurrentRecords?: () => void;
};

const IconTrash = ({ event, goPrevAsNoCurrentRecords }: Props) => {
  const { lockedEvent, handleDelete, unlockThisEvent, fetchProfileUserEvents } =
    useEvent();
  const pathname = usePathname();

  const { loginUser } = useAuth();

  const handleClick = (clickedEvent: TypeEvent) => {
    handleDelete(clickedEvent.id);
    if (loginUser && lockedEvent?.id === clickedEvent.id)
      unlockThisEvent(loginUser.uid);
    if (loginUser && pathname.includes("profile")) {
      fetchProfileUserEvents(loginUser?.uid);
    }
    goPrevAsNoCurrentRecords && goPrevAsNoCurrentRecords();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash
          size={14}
          className="cursor-pointer duration-300 hover:opacity-70"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-72 bg-white dark:bg-slate-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Delete proposal
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left text-gray-500">
            Delete your proposal permanently?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-end gap-3">
          <AlertDialogCancel className="mt-0 h-auto rounded-full border-none hover:bg-gray-50 dark:hover:bg-gray-500">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleClick(event)}
            className="h-auto rounded-full text-red-500 hover:bg-red-50 dark:text-white dark:hover:bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IconTrash;
