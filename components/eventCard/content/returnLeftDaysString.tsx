
import { parseISO } from "date-fns/esm";
import React from "react";

export const returnLeftDaysString = (leftDays: number) => {

  if (leftDays > 3) {
    // More than 3 days left
    return `${leftDays} days left`;
  } else if (leftDays > 0) {
    // 1 to 3 days left (display in red)
    return (
      <span className="text-red-500">{`${leftDays} day${
        leftDays > 1 ? "s" : ""
      } left`}</span>
    )
  } else if (leftDays === 0) {
    // Today
    return <span className="text-red-500">Today</span>;
  } else {
    // In the past (display in red)
    const daysAgo = Math.abs(leftDays);
    return (
      <span className="text-gray-500">{`${daysAgo} day${
        daysAgo > 1 ? "s" : ""
      } ago`}</span>
    );
  }
};
