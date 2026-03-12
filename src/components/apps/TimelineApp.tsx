import { useEffect, useState, useRef } from 'react';

const logs = [
  { time: '2025-05-01T08:00:00Z', level: 'INFO', msg: 'System initialized. Started Platform Engineering Internship at CloudScale Inc.' },
  { time: '2025-06-15T14:32:11Z', level: 'SUCCESS', msg: 'Automated environment provisioning playbook committed.' },
  { time: '2025-08-30T17:05:44Z', level: 'WARN', msg: 'CI execution times high. Optimizing parallel execution pipeline... Reduced by 40%.' },
  { time: '2025-02-12T09:15:00Z', level: 'INFO', msg: 'Earned AWS Certified Solutions Architect - Associate.' },
  { time: '2024-11-05T10:44:22Z', level: 'SUCCESS', msg: 'Merged PR #452 (HashiCorp Terraform) - Fixed edge-case bug in AWS provider.' },
  { time: '2024-09-01T08:00:00Z', level: 'INFO', msg: 'Assumed role: DevOps Lead @ Developer Student Club.' },
  { time: '2024-03-22T16:20:00Z', level: 'ERROR', msg: 'Pod CrashLoopBackOff detected in prod cluster. Root cause identified: OOMKilled. Limits adjusted.' },
  { time: '2023-08-15T09:00:00Z', level: 'INFO', msg: 'Boot sequence initiated: B.Tech Computer Science & Engineering started.' }
];

export default function TimelineApp() {
  const [displayedLogs, setDisplayedLogs] = useState<typeof logs>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < logs.length) {
        setDisplayedLogs(prev => [...prev, logs[index]]);
        index++;
        
        // Auto scroll to bottom
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 400); // Wait 400ms between lines

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-blue-600 bg-blue-100';
      case 'SUCCESS': return 'text-green-700 bg-green-100';
      case 'WARN': return 'text-yellow-700 bg-yellow-100';
      case 'ERROR': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-black text-white p-4 font-mono text-xs md:text-sm h-full flex flex-col">
      <div className="border-b-2 border-gray-800 pb-2 mb-4 flex justify-between items-center text-gray-500">
        <span>tail -f /var/log/career.log</span>
        <span className="animate-pulse">_</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto brutal-scrollbar pr-2 space-y-2">
        {displayedLogs.map((log, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 hover:bg-green-900/30 p-1 transition-colors">
            <span className="text-gray-500 whitespace-nowrap opacity-70">
              {new Date(log.time).toISOString().replace('T', ' ').substr(0, 19)}
            </span>
            <span className={`px-1 py-0.5 font-bold text-[10px] sm:text-xs min-w-[60px] text-center ${getLevelColor(log.level)}`}>
              {log.level}
            </span>
            <span className="text-green-300 break-words">{log.msg}</span>
          </div>
        ))}
        {displayedLogs.length === logs.length && (
          <div className="mt-4 text-green-600 flex gap-2 pt-2 border-t border-green-900/50">
            <span>user@localhost:~$</span>
            <span className="animate-pulse w-2 h-4 bg-green-500 inline-block translate-y-[2px]" />
          </div>
        )}
      </div>
    </div>
  );
}
