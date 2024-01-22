import React from 'react'
import SectionSubTtl from "../../SectionSubTtl";
import RemovePastEventCheckbox from "./RemovePastEventCheckbox";
import RemoveFutureEventCheckbox from "./RemoveFutureEventCheckbox";

const Remove = () => {
  return (
    <div className="flex flex-col w-[50%]">
      <SectionSubTtl text="Remove" />
      <RemovePastEventCheckbox />
      <RemoveFutureEventCheckbox />
    </div>
  );
}

export default Remove