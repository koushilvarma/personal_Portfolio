import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/osStore';
import type { WindowId } from '../../store/osStore';
import { Search, MonitorPlay, Code2, FolderGit2, CalendarDays, Mail, XSquare } from 'lucide-react';

const commands = [
  { id: 'about', label: 'Open About', category: 'Apps', icon: MonitorPlay, action: () => actions.open('about') },
  { id: 'skills', label: 'Open Skills', category: 'Apps', icon: Code2, action: () => actions.open('skills') },
  { id: 'projects', label: 'Open Projects', category: 'Apps', icon: FolderGit2, action: () => actions.open('projects') },
  { id: 'timeline', label: 'Open Timeline', category: 'Apps', icon: CalendarDays, action: () => actions.open('timeline') },
  { id: 'contact', label: 'Open Contact', category: 'Apps', icon: Mail, action: () => actions.open('contact') },
  { id: 'close_all', label: 'Close All Windows', category: 'System', icon: XSquare, action: () => actions.closeAll() },
];

let actions: { open: (id: WindowId) => void; closeAll: () => void; };

export default function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPalette, openWindow, closeWindow, windows } = useStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Bind actions
  actions = {
    open: (id: WindowId) => {
      openWindow(id);
      setCommandPalette(false);
    },
    closeAll: () => {
      Object.keys(windows).forEach((id) => closeWindow(id as WindowId));
      setCommandPalette(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPalette(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPalette]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  const filteredCommands = query === '' 
    ? commands 
    : commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[99]"
            onClick={() => setCommandPalette(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/4 left-1/2 w-full max-w-xl bg-os-window border-3 border-os-border shadow-brutal-lg z-[100] overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b-3 border-os-border bg-yellow-100">
              <Search size={20} className="text-os-border mr-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search commands... (Cmd+K)"
                className="w-full bg-transparent outline-none font-mono text-lg placeholder-os-border/50 text-os-border"
              />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto brutal-scrollbar p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center font-mono text-os-border/50">No results found.</div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left border-2 mb-1 transition-colors ${
                        selectedIndex === idx
                          ? 'bg-os-border text-white border-os-border'
                          : 'bg-transparent text-os-border border-transparent hover:border-os-border/20'
                      }`}
                    >
                      <Icon size={18} className={selectedIndex === idx ? 'text-white' : 'text-os-border'} />
                      <div className="flex flex-col">
                        <span className="font-bold leading-none mb-1">{cmd.label}</span>
                        <span className={`text-[10px] font-mono leading-none ${selectedIndex === idx ? 'text-gray-300' : 'text-gray-500'}`}>
                          {cmd.category}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
            
            <div className="bg-os-border text-white p-2 flex justify-end gap-4 font-mono text-[10px]">
              <span><kbd className="bg-os-window text-os-border px-1.5 py-0.5 rounded-sm">↑↓</kbd> Navigate</span>
              <span><kbd className="bg-os-window text-os-border px-1.5 py-0.5 rounded-sm">↵</kbd> Select</span>
              <span><kbd className="bg-os-window text-os-border px-1.5 py-0.5 rounded-sm">esc</kbd> Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
