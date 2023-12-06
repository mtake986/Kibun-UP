import { useQuote } from "@/context/QuoteContext";
import QuoteList from "./tabs/quotes/QuoteList";
import EventList from "./tabs/events/EventList";
import MobileSortFilterForQuotesOpenBtn from "./tabs/quotes/MobileSortFilterForQuotesOpenBtn";
import { TypeLoginUser } from "@/types/type";
import Tabs from "./tabs/Tabs";
import SectionTitle from "../SectionTitle";

const Data = () => {
  const {
    profileWhichTab,
  } = useQuote();

  // todo: populate it with the profile user
  return (
    <div className="relative mt-10">
      <SectionTitle title="Data" />

      {profileWhichTab === "quotes" ? (
        <MobileSortFilterForQuotesOpenBtn />
      ) : null}

      <Tabs />

      {profileWhichTab === "quotes" ? (
        <QuoteList />
      ) : (
        <EventList />
      )}
    </div>
  );
};

export default Data;
