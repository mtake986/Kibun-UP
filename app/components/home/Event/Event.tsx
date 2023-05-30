"use client";
import React, { useEffect, useState } from "react";
import { builtInEvents } from "@/public/CONSTANTS";
import { AiOutlineInfoCircle } from "react-icons/ai";
const Event = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [leftDays, setLeftDays] = useState<number>(999);
  const toggleInfo = () => {
    setShowInfo(!showInfo);
    if (showInfo) {
      setTimeout(() => setShowInfo(!showInfo), 3000);
    }
  };

  const calculateLeftDays = () => {
    const today = new Date();
    const eventDate = new Date(
      builtInEvents[0].date.year,
      builtInEvents[0].date.month - 1,
      builtInEvents[0].date.day
    );
    const diffTime = Math.abs(eventDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    setLeftDays(diffDays);
  };

  useEffect(() => {
    if (showInfo) {
      setTimeout(() => setShowInfo(!showInfo), 3000);
    }
    calculateLeftDays();
  }, [showInfo]);

  return (
    <div className="relative mt-10 rounded-lg bg-violet-50 p-12">
      <strong className="block text-center text-3xl">
        {builtInEvents[0].title}
      </strong>
      <div
        onClick={() => toggleInfo()}
        className="absolute right-5 top-5 cursor-pointer p-1 text-xl duration-300 hover:opacity-50"
      >
        <AiOutlineInfoCircle />
      </div>
      {showInfo && (
        <div className="absolute right-5 top-5 mt-4 rounded-lg bg-violet-100 p-12 text-center">
          <span>{builtInEvents[0].description}</span>
        </div>
      )}

      <div className="mt-4 text-center">
        {leftDays <= 0 ? (
          <span className="text-xl">It's Today!</span>
        ) : leftDays >= 2 ? (
          <div>
            <span className="text-2xl">{leftDays}</span>
            <span className="text-xl"> days left</span>
          </div>
        ) : (
          <div>
            <span className="text-2xl">{leftDays}</span>
            <span className="text-xl"> day left</span>
          </div>
        )}
      </div>
      <div className="mt-4 text-right">
        <span>
          {builtInEvents[0].date.year}/{builtInEvents[0].date.month}/
          {builtInEvents[0].date.day}
        </span>
      </div>
    </div>
  );
};

export default Event;
