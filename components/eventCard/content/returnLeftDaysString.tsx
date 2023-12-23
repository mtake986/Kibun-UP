import { formatDistanceToNow, isBefore, subDays } from "date-fns";
import { parseISO } from "date-fns/esm";
import React from "react";

export const returnLeftDaysString = (dateString: string) => {
  const currentDate = new Date();
  const targetDate = parseISO(dateString);

  const daysDifference = Math.floor(
    (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDifference > 3) {
    // More than 3 days left
    return `${daysDifference} days left`;
  } else if (daysDifference > 0) {
    // 1 to 3 days left (display in red)
    return (
      <span className="text-red-500">{`${daysDifference} day${
        daysDifference > 1 ? "s" : ""
      } left`}</span>
    );
  } else if (daysDifference === 1) {
    // 1 day left
    return "1 day left";
  } else if (daysDifference === 0) {
    // Today
    return <span className="text-red-500">Today</span>;
  } else {
    // In the past (display in red)
    const daysAgo = Math.abs(daysDifference);
    return (
      <span className="text-gray-500">{`${daysAgo} day${
        daysAgo > 1 ? "s" : ""
      } ago`}</span>
    );
  }
};

// Example usage:
const dateString = "2023-12-20T12:00:00.000Z";
const result = returnLeftDaysString(dateString);
console.log(result);
