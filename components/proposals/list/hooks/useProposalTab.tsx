import { TypeProposalStatusLabel, TypeProposalStatusValue } from "@/types/type";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const useProposalTab = () => {
  const tabs: {
    label: TypeProposalStatusLabel;
    value: TypeProposalStatusValue;
  }[] = [
    { label: "Open", value: "open" },
    // { label: "In Progress", value: "inProgress" },
    { label: "Closed", value: "closed" },
  ];
  const router = useRouter();
  const pathname = usePathname();

  const [currProposalTab, setCurrProposalTab] =
    useState<TypeProposalStatusValue>(tabs[0].value);

  const handleTabClick = (value: TypeProposalStatusValue) => {
    setCurrProposalTab(value);
    router.push(pathname + `?tab=${value}`);
  };
  return { currProposalTab, tabs, handleTabClick };
};

export default useProposalTab;
