import React from 'react'

import DisplayOnlyPastEventCheckbox from "./DisplayOnlyPastEventCheckbox";
import SectionSubTtl from "@/components/event/mine/modal/SectionSubTtl";
import DisplayOnlyFutureEventCheckbox from "./DisplayOnlyFutureEventCheckbox";

const DisplayOnly = () => {
  return (
    <div className="flex w-[50%] flex-col">
      <SectionSubTtl text="Display Only" />
      <DisplayOnlyPastEventCheckbox />
      <DisplayOnlyFutureEventCheckbox />
    </div>
  );
};

export default DisplayOnly;