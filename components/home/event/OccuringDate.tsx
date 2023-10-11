import { fontMerriweather } from "@/components/utils/fonts"
import { IEvent } from "@/types/type"
import React from 'react'

type Props = {
  event: IEvent
}
const OccuringDate = ({event}: Props) => {
  return (
    <span className={`${fontMerriweather.className}`}>
      {event.eventDate.toDate().getMonth() + 1}/
      {event.eventDate.toDate().getDate()},{" "}
      {event.eventDate.toDate().getFullYear()}
    </span>
  );
}

export default OccuringDate