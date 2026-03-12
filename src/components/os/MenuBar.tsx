import { useEffect, useState } from 'react';
import { Command, Power, Moon, RotateCcw, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleCommandPalette = useStore((state) => state.toggleCommandPalette);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSystemAction = (action: string) => {
    setIsMenuOpen(false);
    if (action === 'Power Off' || action === 'Restart') {
      window.location.reload();
    }
  };

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="h-8 bg-os-window border-b-3 border-os-border flex items-center justify-between px-4 z-50 fixed top-0 w-full font-sans font-bold text-sm select-none">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div 
            className={`flex items-center gap-2 cursor-pointer hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors ${isMenuOpen ? 'bg-os-border text-white' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-3 h-3 bg-os-border rounded-full border border-white/20" />
            <span>KV_OSv1</span>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 w-48 bg-white border-3 border-os-border shadow-brutal-sm z-50 py-1"
                >
                  <button onClick={() => handleSystemAction('Update')} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors text-xs font-mono">
                    <ArrowUpCircle size={14} /> Software Update
                  </button>
                  <div className="h-px bg-os-border/20 mx-2 my-1" />
                  <button onClick={() => handleSystemAction('Sleep')} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-zinc-800 hover:text-white transition-colors text-xs font-mono">
                    <Moon size={14} /> Sleep
                  </button>
                  <button onClick={() => handleSystemAction('Restart')} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-zinc-800 hover:text-white transition-colors text-xs font-mono">
                    <RotateCcw size={14} /> Restart...
                  </button>
                  <button onClick={() => handleSystemAction('Power Off')} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-red-600 hover:text-white transition-colors text-xs font-mono">
                    <Power size={14} /> Power Off
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex gap-4 text-xs font-mono">
          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">File</button>

          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">View</button>
          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">Help</button>
          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">Tools</button>
          <button className="hover:bg-os-border hover:text-white px-2 py-0.5 rounded-sm transition-colors">Network</button>
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
