import React from "react";
import ListOfSelectedAuthors from "./ListOfSelectedAuthors";
import SectionSubTtl from "../SectionSubTtl";
import SelectAndOr from "./SelectAndOr";
import SelectTags from "./SelectTags";
import SectionTtl from "../SectionTtl";
import { PropsFetchData } from "@/components/hooks/useQuotesFromQuotableAPI";
import { TypeAndOr, TypeSelectedAuthors } from "@/types/type";

type Props = {
  selectedTags: string[];
  handleTags: (value: string) => void;
  selectedAuthors: TypeSelectedAuthors[];
  handleAuthors: (value: TypeSelectedAuthors) => void;
  andOr: TypeAndOr;
  handleAndOr: (value: "and" | "or") => void;
};

const Filter = ({
  selectedTags,
  handleTags,
  selectedAuthors,
  handleAuthors,
  andOr,
  handleAndOr,
}: Props) => {
  return (
    <div>
      <SectionTtl text="Filter" />
      <div className="mb-3">
        <SectionSubTtl text="Tags" />
        <SelectTags selectedTags={selectedTags} handleTags={handleTags} />
      </div>
      <div className="mb-3">
        <SectionSubTtl text="Authors" />
        <ListOfSelectedAuthors
          selectedAuthors={selectedAuthors}
          handleAuthors={handleAuthors}
        />
      </div>
      <div className="mb-3">
        <SectionSubTtl text="Rule" />
        <SelectAndOr andOr={andOr} handleAndOr={handleAndOr} />
      </div>
    </div>
  );
};

export default Filter;
