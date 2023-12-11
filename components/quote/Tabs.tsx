import { useQuote } from "@/context/QuoteContext";
import ListNotMine from "./notMine/ListNotMine";
import { TypeTabNamesOfQuotes } from "@/types/type";
import ListOfRandom from "./random/ListOfRandom";
import List from "./mine/List";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SwitchTab = () => {
  const { loginUserQuotes, quotesNotMine } = useQuote();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  // functions =====
  const displayList = () => {
    switch (currTab) {
      case "mine":
        return <List quotes={loginUserQuotes} />;
      case "notMine":
        return <ListNotMine quotes={quotesNotMine} />;
      case "api":
        return <ListOfRandom />;
      default:
        return <List quotes={loginUserQuotes} />;
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
            className={`w-full cursor-pointer py-1 text-center text-xs sm:text-sm ${
              currTab === tab.name || (currTab === null && tab.name === "mine")
                ? "rounded-2xl bg-violet-50 text-violet-500 dark:bg-slate-900 dark:text-white"
                : ""
            }`}
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

const tabs: { name: TypeTabNamesOfQuotes; label: string }[] = [
  {
    name: "mine",
    label: "Mine",
  },
  { name: "notMine", label: "Not Mine" },
  { name: "api", label: "Random" },
];

export default SwitchTab;
