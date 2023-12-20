export function TimeAgo(timestamp: number) {
  const timeAgo = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(seconds / interval.seconds);

      if (count >= 1) {
        return count === 1
          ? `${count} ${interval.label} ago`
          : `${count} ${interval.label}s ago`;
      }
    }

    return "just now";
  };

  return <span>{timeAgo(timestamp)}</span>;
}
