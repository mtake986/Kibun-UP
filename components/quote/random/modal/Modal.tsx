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
import SelectAndOr from "./SelectAndOr";
import { PropsFetchData } from "@/components/hooks/useQuotesFromQuotableAPI";
import { TypeAndOr } from "@/types/type";

type Props = {
  selectedTags: string[];
  currentPage: number;
  selectedAuthors: string[];
  andOr: TypeAndOr;
  handleAndOr: (value: 'and' | 'or') => void;
  handleTags: (value: string) => void;
  fetchData: ({
    currentPage,
    selectedTags,
    selectedAuthors,
    andOr,
  }: PropsFetchData) => void;
};

const Modal = ({
  selectedTags,
  currentPage,
  selectedAuthors,
  andOr,
  handleAndOr,
  handleTags,
  fetchData,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Settings className="cursor-pointer p-1 h-6 w-6 duration-300 ease-in hover:rotate-45 hover:opacity-70" />
      </DialogTrigger>
      <DialogContent className="bg-slate-950">
        <form
          className="flex flex-col gap-3"
          onSubmit={() => {
            fetchData({ currentPage, selectedTags, selectedAuthors, andOr });
          }}
        >
          <div className="flex flex-col gap-3">
            <SelectQuotesPerPage />
            <SectionTtl text="Filter" />
            <SelectTags selectedTags={selectedTags} handleTags={handleTags} />
            <SelectAndOr andOr={andOr} handleAndOr={handleAndOr} />
            <SectionTtl text="Sort" />
            <div className="flex flex-col gap-3">
              <HeadingThree text="By Author" />
              <HeadingThree text="By content" />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
