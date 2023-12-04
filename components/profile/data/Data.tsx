import { useQuote } from "@/context/QuoteContext";
import QuoteList from "./tabs/quotes/QuoteList";
import EventList from "./tabs/events/EventList";
import MobileSortFilterForQuotesOpenBtn from "./tabs/quotes/MobileSortFilterForQuotesOpenBtn";
import { TypeLoginUser } from "@/types/type";
import Tabs from "./tabs/Tabs";
import SectionTitle from "../SectionTitle";

type Props = {
  loginUser: TypeLoginUser;
};
const Data = ({ loginUser }: Props) => {
  const {
    loginUserQuotes,
    profileWhichTab,
    allQuotes,
  } = useQuote();

  return (
    <div className="relative mt-10">
      <SectionTitle title="Your Data" />

      {profileWhichTab === "quotes" ? (
        <MobileSortFilterForQuotesOpenBtn />
      ) : null}

      <Tabs loginUser={loginUser} />

      {profileWhichTab === "quotes" ? (
        <QuoteList quotes={loginUserQuotes} />
      ) : (
        <EventList />
      )}
    </div>
  );
};

export default Data;
