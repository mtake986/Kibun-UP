import React from 'react'

import DisplayOnlyPastEventCheckbox from "./DisplayOnlyPastEventCheckbox";
import SectionSubTtl from "@/components/event/mine/modal/SectionSubTtl";
import DisplayOnlyPastEventCheckboxFutureEventCheckbox from "./DisplayOnlyPastEventCheckboxFutureEventCheckbox";

const DisplayOnly = () => {
  return (
    <div className="flex w-[50%] flex-col">
      <SectionSubTtl text="Display Only" />
      <DisplayOnlyPastEventCheckbox />
      <DisplayOnlyPastEventCheckboxFutureEventCheckbox />
    </div>
  );
};

export default DisplayOnly;