import { Settings } from "lucide-react";
import React from "react";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Filter from "./filter/Filter";
import Sort from "./sort/Sort";
import { displayErrorToast } from "@/functions/displayToast";
import { useQuote } from "@/context/QuoteContext";
import { Button } from "@/components/ui/button";
import ElementSelect from "./sort/ElementSelect";
import useProposals from "../../form/hooks/useProposals";

type Props = {
  sortBy: "newestFirst" | "mostVotes";
  setSortBy: React.Dispatch<React.SetStateAction<"newestFirst" | "mostVotes">>;
};

const Modal = ({ sortBy, setSortBy }: Props) => {
  const { sortProposals } = useProposals();

  return (
    <Dialog>
      <DialogTrigger className="relative">
        <Settings className="h-6 w-6 cursor-pointer p-1 duration-300 ease-in hover:rotate-45 hover:opacity-70" />
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-slate-950">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            try {
              sortProposals(sortBy);
            } catch (error) {
              displayErrorToast(error);
            }
          }}
        >
          <div className="flex flex-col gap-3">
            <Filter />
            {/* <Sort /> */}
            {/* <ElementSelect sortBy={sortBy} setSortBy={setSortBy} /> */}
          </div>
          {/* <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button
                type="submit"
                className="w-full rounded-md text-white hover:bg-green-500"
              >
                Update
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="rounded-md text-white hover:bg-red-500"
                type="reset"
                onClick={() => {}}
              >
                Reset
              </Button>
            </DialogClose>
          </div> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
