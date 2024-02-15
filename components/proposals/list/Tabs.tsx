import { TypeProposalStatusValue } from "@/types/type";
import { usePathname, useSearchParams, useRouter} from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  tabs: { label: string; value: TypeProposalStatusValue }[];
  handleTabClick: (value: TypeProposalStatusValue) => void;
};
const Tabs = ({ tabs, handleTabClick }: Props) => {
  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  return (
    <div className="flex items-stretch">
      {tabs.map((tab) => (
        <span
          key={tab.label}
          className={twMerge(
            "w-full cursor-pointer py-1 text-center text-xs sm:text-sm",
            currTab === tab.value || (currTab === null && tab.value === "open")
              ? "rounded-2xl bg-violet-50 text-violet-500 dark:bg-slate-900 dark:text-white"
              : ""
          )}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.label}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
