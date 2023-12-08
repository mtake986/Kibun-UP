import { TypeEvent } from "@/types/type";

import { useState } from "react";
import Content from "./content/Content";
import Icons from "./Icons/Icons";
import EditModeOn from "./content/EditModeOn";
import LoadingSpinnerL from "../utils/LoadingSpinnerL";

type Props = {
  event: TypeEvent;
  goPrevAsNoCurrentRecords?: () => void;
};

const EventCard = ({ event, goPrevAsNoCurrentRecords }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="rounded-md border px-4 py-6 dark:border-white sm:p-6">
      {isLoading ? (
        <LoadingSpinnerL />
      ) : (
        <>
          {isUpdateMode ? (
            <EditModeOn
              event={event}
              setIsUpdateMode={setIsUpdateMode}
              setIsLoading={setIsLoading}
            />
          ) : (
            <Content event={event} />
          )}

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
