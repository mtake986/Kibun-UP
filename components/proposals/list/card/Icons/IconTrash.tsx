import { useAuth } from "@/context/AuthContext";
import { TypeProposal } from "@/types/type";
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
import useProposals from "@/components/proposals/form/hooks/useProposals";
import { displayErrorToast } from "@/functions/displayToast";

type Props = {
  proposal: TypeProposal;
  goPrevAsNoCurrentRecords?: () => void;
};

const IconTrash = ({ proposal, goPrevAsNoCurrentRecords }: Props) => {
  const { loginUser } = useAuth();
  const { deleteProposal } = useProposals();

  const handleClick = (proposalId: string) => {
    try {
      deleteProposal(proposalId);
      goPrevAsNoCurrentRecords && goPrevAsNoCurrentRecords();
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
      <AlertDialogContent className="w-72 bg-white dark:bg-slate-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Delete proposal
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left text-gray-500">
            Delete your proposal permanently?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center gap-3 justify-end">
          <AlertDialogCancel className="mt-0 h-auto border-none hover:bg-gray-500 rounded-full">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleClick(proposal.id)}
            className="h-auto hover:bg-red-500 rounded-full"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IconTrash;
