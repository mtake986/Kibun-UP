import React from 'react'
import SectionSubTtl from "../../SectionSubTtl";
import DisplayOnlyPastEventCheckbox from "./DisplayOnlyPastEventCheckbox";
import DisplayOnlyFutureEventCheckbox from "./DisplayOnlyFutureEventCheckbox";

const DisplayOnly = () => {
  return (
    <div className="flex flex-col w-[50%]">
      <SectionSubTtl text="Display Only" />
      <DisplayOnlyPastEventCheckbox />
      <DisplayOnlyFutureEventCheckbox />
    </div>
  );
}

export default DisplayOnly;