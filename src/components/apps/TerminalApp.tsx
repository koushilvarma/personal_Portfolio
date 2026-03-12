import React, { useState, useRef, useEffect } from 'react';

interface LogEntry {
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function TerminalApp() {
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'output', content: 'KoushilOS [Version 1.0.42]' },
    { type: 'output', content: '(c) Koushil Varma. All rights reserved.' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => void> = {
    help: () => {
      addLog('output', 'Available commands:');
      addLog('output', '  about     - Learn more about Koushil');
      addLog('output', '  projects  - View featured projects');
      addLog('output', '  skills    - List technical expertise');
      addLog('output', '  contact   - Get contact details');
      addLog('output', '  clear     - Clear the terminal screen');
      addLog('output', '  whoami    - Display current user');
      addLog('output', '  date      - Display current date');
    },
    about: () => addLog('output', 'Koushil Varma - A passionate developer building the next generation of web apps.'),
    projects: () => addLog('output', 'Loading projects... check out the Projects icon in the dock for a better view!'),
    skills: () => addLog('output', 'React, TypeScript, Node.js, Docker, Kubernetes, AWS, and more.'),
    contact: () => {
      addLog('output', 'Email: kakarlapudikoushilvarma@gmail.com');
      addLog('output', 'LinkedIn: linkedin.com/in/koushil-varma-k-83b3b4260/');
      addLog('output', 'GitHub: github.com/koushilvarma');
    },
    clear: () => setHistory([]),
    whoami: () => addLog('output', 'visitor@koushilvarma.com'),
    date: () => addLog('output', new Date().toString()),
    ls: () => addLog('output', 'about.exe  projects/  skills.txt  resume.pdf  paint.exe'),
  };

  const addLog = (type: LogEntry['type'], content: string) => {
    setHistory(prev => [...prev, { type, content }]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    addLog('input', `C:\\Users\\Guest> ${input}`);
    
    if (cmd) {
      if (commands[cmd]) {
        commands[cmd]();
      } else {
        addLog('error', `'${cmd}' is not recognized as an internal or external command.`);
      }
    }
    
    setInput('');
  };

  return (
    <div className="h-full bg-[#0c0c0c] text-[#cccccc] font-mono p-4 overflow-hidden flex flex-col selection:bg-[#fff] selection:text-[#000]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2 space-y-1 scrollbar-hide">
        {history.map((entry, i) => (
          <div key={i} className={`${entry.type === 'error' ? 'text-red-500' : entry.type === 'input' ? 'text-white' : ''}`}>
            {entry.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex gap-2 shrink-0">
        <span className="text-white shrink-0">C:\Users\Guest&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white flex-1 p-0 caret-white"
          autoFocus
        />
      </form>
    </div>
  );
}
