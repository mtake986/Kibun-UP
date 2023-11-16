import { Settings } from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SelectQuotesPerPage from "../SelectQuotesPerPage";
import HeadingThree from "@/components/utils/HeadingThree";
import SectionTtl from "./SectionTtl";
import { PropsFetchData } from "@/components/hooks/useQuotesFromQuotableAPI";
import { TypeAndOr, TypeSelectedAuthors } from "@/types/type";
import Filter from "./filter/Filter";
import Sort from "./sort/Sort";

type Props = {
  currentPage: number;
  fetchData: ({
    currentPage,
    selectedTags,
    selectedAuthors,
    andOr,
  }: PropsFetchData) => void;
  selectedTags: string[];
  handleTags: (value: string) => void;
  selectedAuthors: TypeSelectedAuthors[];
  handleAuthors: (value: TypeSelectedAuthors) => void;
  andOr: TypeAndOr;
  handleAndOr: (value: "and" | "or") => void;
};

const Modal = ({
  currentPage,
  fetchData,
  selectedTags,
  handleTags,
  selectedAuthors,
  handleAuthors,
  andOr,
  handleAndOr,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Settings className="h-6 w-6 cursor-pointer p-1 duration-300 ease-in hover:rotate-45 hover:opacity-70" />
      </DialogTrigger>
      <DialogContent className="bg-slate-950">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            fetchData({ currentPage, selectedTags, selectedAuthors, andOr });
          }}
        >
          <div className="flex flex-col gap-3">
            <SelectQuotesPerPage />
            <Filter
              selectedTags={selectedTags}
              handleTags={handleTags}
              selectedAuthors={selectedAuthors}
              handleAuthors={handleAuthors}
              andOr={andOr}
              handleAndOr={handleAndOr}
            />
            <Sort />
          </div>
          <button type="submit">Update</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
