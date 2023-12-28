import { useEvent } from "@/context/EventContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import List from "../mine/List";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TypeEvent } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import { twMerge } from "tailwind-merge";

const Tabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  const { allEvents, loginUserEvents } = useEvent();
  const { loginUser } = useAuth();
  // functions =====
  const displayList = () => {
    switch (currTab) {
      case "mine":
        return <List events={loginUserEvents} />;
      case "notMine":
        // return <ListNotMine quotes={quotesNotMine} />;
        return (
          <List
            events={allEvents.filter(
              (event: TypeEvent) => event.createdBy !== loginUser?.uid
            )}
          />
        );
      default:
        return <List events={loginUserEvents} />;
    }
  };

  const handleClick = (val: string) => {
    router.push(pathname + `?tab=${val}`);
  };

  return (
    <div>
      <div className="mb-3 flex items-stretch">
        {tabs.map((tab) => (
          <span
            key={tab.name}
            className={twMerge(
              "w-full cursor-pointer py-1 text-center text-xs sm:text-sm",
              currTab === tab.name || (currTab === null && tab.name === "mine")
                ? "rounded-2xl bg-violet-50 text-violet-500 dark:bg-slate-900 dark:text-white"
                : ""
            )}
            onClick={() => handleClick(tab.name)}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {displayList()}
    </div>
  );
};

const tabs: { name: "mine" | "notMine"; label: string }[] = [
  {
    name: "mine",
    label: "Mine",
  },
  { name: "notMine", label: "Not Mine" },
];

export default Tabs;
