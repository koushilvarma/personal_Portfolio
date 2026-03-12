import { useEffect, useState, useRef } from 'react';

const logs = [
  { time: '2026-03-12T14:30:00Z', level: 'SUCCESS', msg: 'System Stability: Timeline.log rendering and auto-scroll logic stabilized.' },
  { time: '2026-03-12T14:25:00Z', level: 'SUCCESS', msg: 'Final deployment readiness: Production build verified and git repository synchronized.' },
  { time: '2026-03-12T14:20:00Z', level: 'SUCCESS', msg: 'System Control Suite: Restart animation (rotating system spinner) implemented.' },
  { time: '2026-03-12T14:15:00Z', level: 'SUCCESS', msg: 'System Control Suite: Sleep screensaver (bouncing KV_OS icon) configured.' },
  { time: '2026-03-12T14:10:00Z', level: 'SUCCESS', msg: 'System Control Suite: Power Off blackout sequence successfully deployed.' },
  { time: '2026-03-12T14:05:00Z', level: 'INFO', msg: 'OS Branding: Fixed copyright notice footer added to system core.' },
  { time: '2026-03-12T13:45:00Z', level: 'INFO', msg: 'App Engine: Docs App (Rich Text Editor) with MacOS styling enabled.' },
  { time: '2026-03-12T13:10:00Z', level: 'INFO', msg: 'App Engine: Music App with customized "Coding Playlist" integrated.' },
  { time: '2026-03-12T10:00:00Z', level: 'SUCCESS', msg: 'Terminal (CMD): Contact shortcuts (Email, LinkedIn, GitHub) added to help.' },
  { time: '2026-03-12T09:30:00Z', level: 'INFO', msg: 'Terminal (CMD): Shell environment initialized with retro command simulate.' },
  { time: '2026-03-11T16:20:00Z', level: 'INFO', msg: 'Creative Suite: Calculator and Canvas Paint apps added to window registry.' },
  { time: '2026-03-11T12:00:00Z', level: 'INFO', msg: 'UI Polish: Removed yellow tint from About page for natural color reproduction.' },
  { time: '2026-03-11T10:00:00Z', level: 'SUCCESS', msg: 'Kernel: KV_OSv1 initialized. Neo-Brutalist design tokens applied.' },
  { time: '2025-08-30T17:05:44Z', level: 'SUCCESS', msg: 'Milestone: Platform Engineering Internship @ CloudScale Inc completed.' },
  { time: '2025-02-12T09:15:00Z', level: 'INFO', msg: 'Certification: AWS Certified Solutions Architect - Associate earned.' },
  { time: '2024-11-05T10:44:22Z', level: 'SUCCESS', msg: 'OSS: PR #452 merged in HashiCorp Terraform AWS provider.' },
  { time: '2023-08-15T09:00:00Z', level: 'INFO', msg: 'System Init: B.Tech in Computer Science & Engineering started.' }
];

const formatLogTime = (timeStr: string) => {
  try {
    const d = new Date(timeStr);
    if (isNaN(d.getTime())) return 'UNKNOWN DATE';
    return d.toISOString().replace('T', ' ').substring(0, 19);
  } catch (e) {
    return 'INVALID DATE';
  }
};

export default function TimelineApp() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-blue-600 bg-blue-100';
      case 'SUCCESS': return 'text-green-700 bg-green-100';
      case 'WARN': return 'text-yellow-700 bg-yellow-100';
      case 'ERROR': return 'text-red-600 bg-red-100';
      default: return 'text-zinc-600 bg-zinc-100';
    }
  };

  return (
    <div className="bg-black text-zinc-300 p-6 font-mono text-xs md:text-sm h-full flex flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto brutal-scrollbar pr-2 space-y-4">
        {logs.map((log, i) => (
          <div 
            key={i} 
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 hover:bg-zinc-900/50 p-2 transition-colors border-l-2 border-transparent hover:border-zinc-500 group"
          >
            <span className="text-zinc-500 whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
              {formatLogTime(log.time)}
            </span>
            <span className={`px-2 py-0.5 font-bold text-[10px] sm:text-xs min-w-[70px] text-center uppercase tracking-tighter ${getLevelColor(log.level)}`}>
              [{log.level}]
            </span>
            <span className="text-zinc-200 break-words flex-1 leading-relaxed">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


