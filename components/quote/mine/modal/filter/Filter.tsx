import React from "react";
import ListOfSelectedAuthors from "./ListOfSelectedAuthors";
import SectionSubTtl from "../SectionSubTtl";
import SelectAndOr from "./SelectAndOr";
import SelectTags from "./SelectTags";
import SectionTtl from "../SectionTtl";
import { TypeAndOr, TypeAndOrLabel, TypeSelectedAuthors } from "@/types/type";

const Filter = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <SectionSubTtl text="Tags" />
      <SelectTags />
    </div>
  );
};

export default Filter;
