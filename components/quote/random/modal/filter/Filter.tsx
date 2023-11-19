import React from "react";
import ListOfSelectedAuthors from "./ListOfSelectedAuthors";
import SectionSubTtl from "../SectionSubTtl";
import SelectAndOr from "./SelectAndOr";
import SelectTags from "./SelectTags";
import SectionTtl from "../SectionTtl";
import { TypeAndOr, TypeAndOrLabel, TypeSelectedAuthors } from "@/types/type";

type Props = {
  selectedTags: string[];
  handleTags: (value: string) => void;
  selectedAuthors: TypeSelectedAuthors[];
  handleAuthors: (value: TypeSelectedAuthors) => void;
  andOr: TypeAndOr;
  handleAndOr: (value: TypeAndOrLabel) => void;
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
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <div>
        <SectionSubTtl text="Tags" />
        <SelectTags selectedTags={selectedTags} handleTags={handleTags} />
      </div>
      <div>
        <SectionSubTtl text="Authors" />
        <ListOfSelectedAuthors
          selectedAuthors={selectedAuthors}
          handleAuthors={handleAuthors}
        />
      </div>
      <div>
        <SectionSubTtl text="Rule" />
        <SelectAndOr andOr={andOr} handleAndOr={handleAndOr} />
      </div>
    </div>
  );
};

export default Filter;
