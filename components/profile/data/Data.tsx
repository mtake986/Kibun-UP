import QuoteList from "./tabs/quotes/QuoteList";
import EventList from "./tabs/events/EventList";
import MobileSortFilterForQuotesOpenBtn from "./tabs/quotes/MobileSortFilterForQuotesOpenBtn";
import Tabs from "./tabs/Tabs";
import SectionTitle from "../SectionTitle";
import { useSearchParams } from "next/navigation";

const Data = () => {

  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");


  // todo: populate it with the profile user
  return (
    <div className="relative mt-10">
      <SectionTitle title="Data" />

      {currTab === "quotes" ? (
        <MobileSortFilterForQuotesOpenBtn />
      ) : null}

      <Tabs />

      {currTab === "events" ? (
        <EventList />
        ) : (
        <QuoteList />
      )}
    </div>
  );
};

export default Data;
