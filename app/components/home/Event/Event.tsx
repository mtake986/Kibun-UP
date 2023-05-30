import React from 'react'
import { builtInEvents } from '@/public/CONSTANTS';

const Event = () => {
  return (
    <div className="mt-10 rounded-lg bg-violet-50 p-12">
      <strong className="text-xl">{builtInEvents[0].title}</strong>
      <div className="mt-4 text-right">
        <span>- {builtInEvents[0].description}</span>
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
