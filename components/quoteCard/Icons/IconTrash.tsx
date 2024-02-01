import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeQuote } from "@/types/type";
import { Trash } from "lucide-react";
import React, { useState } from "react";

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
import { usePathname } from "next/navigation";

type Props = {
  q: TypeQuote;
  goPrevAsNoCurrentRecords?: () => void;
};

const IconTrash = ({ q, goPrevAsNoCurrentRecords }: Props) => {
  const {
    lockedQuote,
    handleDelete,
    removeLockFromThisQuote,
    fetchProfileUserQuotes,
  } = useQuote();
  const pathname = usePathname();

  const { loginUser } = useAuth();

  const handleClick = (q: TypeQuote) => {
    try {
      handleDelete(q.id);
      if (loginUser && lockedQuote?.id === q.id)
        removeLockFromThisQuote(loginUser?.uid);
      if (loginUser && pathname.includes("profile")) {
        fetchProfileUserQuotes(loginUser?.uid);
      }
      goPrevAsNoCurrentRecords && goPrevAsNoCurrentRecords();
    } catch (e) {
      displayErrorToast(e);
    }
  }
  
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
          <AlertDialogCancel className="mt-0 h-auto rounded-full border-none hover:bg-gray-500">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleClick(q)}
            className="h-auto rounded-full hover:bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IconTrash;
