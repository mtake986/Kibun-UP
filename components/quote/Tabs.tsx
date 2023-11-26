import { useQuote } from "@/context/QuoteContext";
import ListNotMine from "./notMine/ListNotMine";
import List from "./mine/List";
import { TypeLoginUser, TypeTabNamesOfQuotes } from "@/types/type";
import ListOfRandom from "./random/ListOfRandom";

const SwitchTab = () => {
  const { loginUserQuotes, quotesNotMine, whichList, handleWhichList } =
    useQuote();

  const displayList = () => {
    switch (whichList) {
      case "mine":
        return <List quotes={loginUserQuotes} />;
      case "all":
        return <ListNotMine quotes={quotesNotMine} />;
      case "api":
        return <ListOfRandom />;
      default:
        return <div>error</div>;
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-stretch">
        {tabs.map((tab) => (
          <span
            key={tab.name}
            className={`w-full cursor-pointer py-1 text-center text-xs sm:text-sm ${
              whichList === tab.name
                ? "rounded-2xl bg-violet-50 text-violet-500 dark:bg-slate-900 dark:text-white"
                : ""
            }`}
            onClick={() => handleWhichList(tab.name)}
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
  { name: "all", label: "All" },
  { name: "api", label: "Random" },
];

export default SwitchTab;
