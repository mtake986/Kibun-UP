import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeQuote } from "@/types/type";
import { Trash } from "lucide-react";
import React from "react";

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
import { MdCancel, MdOutlineCancel } from "react-icons/md";

type Props = {
  q: TypeQuote;
};

const IconTrash = ({ q }: Props) => {
  const { lockedQuote, handleDelete, removeLockFromThisQuote } = useQuote();

  const { loginUser } = useAuth();

  const handleClick = (q: TypeQuote) => {
    try {
      handleDelete(q.id);
      if (loginUser && lockedQuote?.id === q.id)
        removeLockFromThisQuote(loginUser?.uid);
    } catch (e) {
      displayErrorToast(e);
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
            onClick={() => handleClick(q)}
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
