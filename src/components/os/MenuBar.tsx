import { useEffect, useState } from 'react';
import { useStore } from '../../store/osStore';
import { Command } from 'lucide-react';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const toggleCommandPalette = useStore((state) => state.toggleCommandPalette);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="h-8 bg-os-window border-b-3 border-os-border flex items-center justify-between px-4 z-50 fixed top-0 w-full font-sans font-bold text-sm select-none">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-3 h-3 bg-os-border rounded-full" />
          <span>KV_OSv1</span>
        </div>
        
        <div className="hidden md:flex gap-4 text-xs font-mono">
          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">File</button>
          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">Edit</button>
          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">View</button>
          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">Help</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleCommandPalette}
          className="flex items-center gap-1 hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors font-mono text-xs"
        >
          <Command size={14} />
          <span>Cmd+K</span>
        </button>
        <div className="w-px h-4 bg-os-border mx-1" />
        <span className="font-mono text-xs">{dateString}</span>
        <span className="font-mono text-xs">{timeString}</span>
      </div>
    </div>
  );
}
