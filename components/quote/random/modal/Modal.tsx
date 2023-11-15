import { Settings } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectQuotesPerPage from "../SelectQuotesPerPage";
import SelectTags from "./SelectTags";
import HeadingThree from "@/components/utils/HeadingThree";
import SectionTtl from "./SectionTtl";
import FieldsOfFilter from "./AuthorNames";

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
        />
      </DialogTrigger>
      <DialogContent className="bg-slate-950">
        <div className="flex flex-col gap-3">
          <SelectQuotesPerPage />
          <SectionTtl text="Filter" />
          <SelectTags selectedTags={selectedTags} handleTags={handleTags} />
          <FieldsOfFilter />
          <SectionTtl text="Sort" />
          <div className="flex flex-col gap-3">
            <HeadingThree text="By Author" />
            <HeadingThree text="By content" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
