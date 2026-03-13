import { useState, useEffect } from 'react';

export default function LiveClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-20">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-mono tracking-tighter text-os-border whitespace-nowrap">
        {timeString}
      </h1>
      <p className="text-sm md:text-xl font-bold mt-2 tracking-widest uppercase text-os-border">
        {dateString}
      </p>
    </div>
  );
}
