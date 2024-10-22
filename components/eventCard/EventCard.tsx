import { TypeEvent } from "@/types/type";
import { useState } from "react";
import Content from "./content/Content";
import EditModeOn from "./content/EditModeOn";
import Icons from "./Icons/Icons";

type Props = {
  event: TypeEvent;
  goPrevAsNoCurrentRecords?: () => void;
};

const EventCard = ({ event, goPrevAsNoCurrentRecords }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  return (
    <div className="rounded-md border px-4 py-6 dark:border-white sm:p-6">
        {isUpdateMode ? (
          <EditModeOn
            event={event}
            setIsUpdateMode={setIsUpdateMode}
          />
        ) : (
          <>
            <Content event={event} />
            <Icons
              event={event}
              setIsUpdateMode={setIsUpdateMode}
              isUpdateMode={isUpdateMode}
              goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords}
            />
          </>
        )}
    </div>
  );
};

export default EventCard;
