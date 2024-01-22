import React from 'react'

import RemovePastEventCheckbox from "./RemovePastEventCheckbox";
import RemoveFutureEventCheckbox from "./RemoveFutureEventCheckbox";
import SectionSubTtl from "@/components/event/mine/modal/SectionSubTtl";

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