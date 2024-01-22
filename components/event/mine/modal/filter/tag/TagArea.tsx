import React from 'react'
import SectionSubTtl from "../../SectionSubTtl";
import TagInput from "./TagInput";

const TagArea = () => {
  return (
    <div className="flex flex-col w-[50%]">
      <SectionSubTtl text="Tags" />
      <TagInput />
    </div>
  );
}

export default TagArea