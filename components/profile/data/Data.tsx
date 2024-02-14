import QuoteList from "./tabs/quotes/QuoteList";
import EventList from "./tabs/events/EventList";
import Tabs from "./tabs/Tabs";
import SectionTitle from "../SectionTitle";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Data = () => {
  // const searchParams = useSearchParams();
  // const currTab = searchParams.get("tab");
  const [currTab, setCurrTab] = useState<'quotes' | 'events'>('quotes')
  // todo: populate it with the profile user
  return (
    <div className="relative mt-10">
      <SectionTitle title="Data" />
      <Tabs currTab={currTab} setCurrTab={setCurrTab} />
      {currTab === "quotes" || currTab === null ? <QuoteList /> : <EventList />}
    </div>
  );
};

export default Data;
