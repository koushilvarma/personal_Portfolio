import { useState, useEffect } from 'react';
import { Cpu, Database } from 'lucide-react';
import { useStore } from '../../store/osStore';

export default function ActivityMonitorApp() {
  const { windows, closeWindow } = useStore();
  const [cpuUsage, setCpuUsage] = useState(15);
  const [ramUsage, setRamUsage] = useState(2.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40) + 10);
      setRamUsage(parseFloat((2.4 + Math.random() * 0.5).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeWindows = Object.values(windows).filter(w => w.isOpen);

  return (
    <div className="p-6 h-full bg-os-bg-white text-os-border flex flex-col gap-6 overflow-auto brutal-scrollbar">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-os-window border-3 border-os-border p-4 shadow-brutal-sm flex items-center gap-4">
          <Cpu className="text-blue-500" size={32} />
          <div>
            <p className="text-[10px] font-bold opacity-60 uppercase">CPU Usage</p>
            <p className="text-xl font-bold font-mono">{cpuUsage}%</p>
          </div>
          <div className="flex-1 h-8 bg-zinc-100 border-2 border-os-border overflow-hidden relative">
            <div 
              className="h-full bg-blue-500 transition-all duration-1000" 
              style={{ width: `${cpuUsage}%` }} 
            />
          </div>
        </div>
        <div className="bg-os-window border-3 border-os-border p-4 shadow-brutal-sm flex items-center gap-4">
          <Database className="text-green-500" size={32} />
          <div>
            <p className="text-[10px] font-bold opacity-60 uppercase">RAM Usage</p>
            <p className="text-xl font-bold font-mono">{ramUsage}GB</p>
          </div>
          <div className="flex-1 h-8 bg-zinc-100 border-2 border-os-border overflow-hidden relative">
            <div 
              className="h-full bg-green-500 transition-all duration-1000" 
              style={{ width: `${(ramUsage / 8) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-os-window border-3 border-os-border shadow-brutal-md flex flex-col overflow-hidden">
        <div className="bg-os-border text-white px-3 py-1 font-mono text-[10px] flex justify-between uppercase">
          <span>Active Processes</span>
          <span>Status: Running</span>
        </div>
        <div className="flex-1 overflow-auto brutal-scrollbar">
          <table className="w-full text-left font-mono text-xs">
            <thead className="sticky top-0 bg-os-window border-b-2 border-os-border">
              <tr>
                <th className="p-2 border-r-2 border-os-border uppercase">Process Name</th>
                <th className="p-2 border-r-2 border-os-border uppercase text-center">PID</th>
                <th className="p-2 border-r-2 border-os-border uppercase text-center">Status</th>
                <th className="p-2 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeWindows.map((win, idx) => (
                <tr key={win.id} className="hover:bg-zinc-100 transition-colors border-b-2 border-os-border/10">
                  <td className="p-2 border-r-2 border-os-border font-bold">{win.title}</td>
                  <td className="p-2 border-r-2 border-os-border text-center">{1024 + idx}</td>
                  <td className="p-2 border-r-2 border-os-border text-center">
                    <span className="text-green-600 bg-green-50 px-1 border border-green-600 font-bold">ACTIVE</span>
                  </td>
                  <td className="p-2 text-center">
                    <button 
                      onClick={() => closeWindow(win.id)}
                      className="bg-red-500 text-white px-2 py-0.5 border-2 border-os-border shadow-brutal-active text-[10px] font-bold hover:translate-y-0.5"
                    >
                      KILL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
