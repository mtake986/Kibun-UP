import { Settings } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectQuotesPerPage from "../SelectQuotesPerPage";
import SelectTags from "./SelectTags";

type Props = {
  selectedTags: string[];
  handleTags: (value: string) => void;
};

const Modal = ({ selectedTags, handleTags }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Settings
          className="cursor-pointer p-1 text-sm duration-300 ease-in hover:rotate-45 hover:opacity-70"
          onClick={() =>
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            )?.showModal()
          }
        />
      </DialogTrigger>
      <DialogContent className="bg-slate-950">
        <div className="flex flex-col gap-3">
          {/* Pagination */}
          <div className="flex flex-col gap-1 xs:flex-row xs:items-center xs:justify-between">
            <SelectQuotesPerPage />
          </div>
          {/* Tags for filter */}
          <SelectTags selectedTags={selectedTags} handleTags={handleTags} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
