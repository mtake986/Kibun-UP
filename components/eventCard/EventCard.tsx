import { TypeEvent } from "@/types/type";

import { useState } from "react";
import Content from "./content/Content";
import Icons from "./Icons/Icons";
import EditModeOn from "./content/EditModeOn";
import LoadingSpinner from "../utils/LoadingSpinner";

type Props = {
  event: TypeEvent;
};

const EventCard = ({ event }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="rounded-md border px-4 py-6 dark:border-white sm:p-6">
      {isLoading ? (
        <LoadingSpinner scale={48} />
      ) : isUpdateMode ? (
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
      />
    </div>
  );
};

export default EventCard;
