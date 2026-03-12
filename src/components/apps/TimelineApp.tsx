import { useEffect, useRef } from 'react';

const logs = [
  { time: '2026-03-12T14:35:00Z', level: 'SUCCESS', msg: 'System Core: Final stability patches applied to Timeline engine.' },
  { time: '2026-03-12T14:25:00Z', level: 'SUCCESS', msg: 'System Core: Deployment readiness verified.' },
  { time: '2026-03-12T14:20:00Z', level: 'INFO', msg: 'App Suite: Restart, Sleep, and Power components active.' },
  { time: '2026-03-12T13:45:00Z', level: 'INFO', msg: 'App Suite: Docs and Music players integrated.' },
  { time: '2026-03-12T09:30:00Z', level: 'INFO', msg: 'Terminal: Custom command shell initialized.' },
  { time: '2026-03-11T16:20:00Z', level: 'INFO', msg: 'Design: Creative apps and Paint engine live.' },
  { time: '2026-03-11T10:00:00Z', level: 'SUCCESS', msg: 'Kernel: KV_OSv1 boot sequence complete.' },
  { time: '2023-08-15T09:00:00Z', level: 'INFO', msg: 'Boot Init: Engineering journey started.' }
];

export default function TimelineApp() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-zinc-300 p-6 font-mono text-xs md:text-sm h-full flex flex-col overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto brutal-scrollbar pr-2 space-y-4">
        {logs.map((log, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-l-2 border-zinc-800 p-2">
            <span className="text-zinc-500 whitespace-nowrap opacity-70">
              {log.time.split('T')[0]}
            </span>
            <span className="text-zinc-200 break-words flex-1">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


