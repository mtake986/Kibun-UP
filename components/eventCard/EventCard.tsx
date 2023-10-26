import { TypeEvent } from "@/types/type";

import { useState } from "react";
import Content from "./content/Content";
import Icons from "./Icons/Icons";
import EditModeOn from "./content/EditModeOn";

type Props = {
  event: TypeEvent;
};

const EventCard = ({ event }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // if (q.userInfo.uid !== user?.uid && q.isDraft) return null;

  return (
    <div className="mb-3 rounded-sm border px-4 py-6 dark:border-white sm:p-6">
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
      />
    </div>
  );
};

export default EventCard;
