import React from 'react'

import TagInput from "./TagInput";
import SectionSubTtl from "@/components/event/mine/modal/SectionSubTtl";

const TagArea = () => {
  return (
    <div className="flex flex-col w-[50%]">
      <SectionSubTtl text="Tags" />
      <TagInput />
    </div>
  );
}

export default TagArea