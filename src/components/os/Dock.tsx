import { useStore } from '../../store/osStore';
import type { WindowId } from '../../store/osStore';
import { UserCircle, Code2, FolderGit2, CalendarDays, Mail, FileText, Search, Settings, StickyNote, Activity, MessageSquare, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const apps = [
  { id: 'about' as WindowId, label: 'About', icon: UserCircle, color: 'bg-blue-400' },
  { id: 'skills' as WindowId, label: 'Skills', icon: Code2, color: 'bg-green-400' },
  { id: 'projects' as WindowId, label: 'Projects', icon: FolderGit2, color: 'bg-purple-400' },
  { id: 'timeline' as WindowId, label: 'Timeline', icon: CalendarDays, color: 'bg-orange-400' },
  { id: 'contact' as WindowId, label: 'Contact', icon: Mail, color: 'bg-red-400' },
  { id: 'resume' as WindowId, label: 'Resume', icon: FileText, color: 'bg-yellow-400' },
  { id: 'finder' as WindowId, label: 'Search', icon: Search, color: 'bg-blue-500' },
  { id: 'settings' as WindowId, label: 'Settings', icon: Settings, color: 'bg-zinc-400' },
  { id: 'notes' as WindowId, label: 'Notes', icon: StickyNote, color: 'bg-yellow-200' },
  { id: 'monitor' as WindowId, label: 'Activity', icon: Activity, color: 'bg-red-500' },
  { id: 'messenger' as WindowId, label: 'Chat', icon: MessageSquare, color: 'bg-indigo-400' },
  { id: 'game' as WindowId, label: 'Snake', icon: Gamepad2, color: 'bg-green-500' },
];

export default function Dock() {
  const { windows, openWindow, focusWindow } = useStore();
  const [hoveredId, setHoveredId] = useState<WindowId | null>(null);

  const handleAppClick = (id: WindowId) => {
    if (!windows[id].isOpen) {
      openWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-os-window border-3 border-os-border p-2 shadow-brutal-md flex gap-2 max-w-[95vw] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {apps.map((app) => {
          const isOpen = windows[app.id].isOpen;

          return (
            <div
              key={app.id}
              className="relative"
              onMouseEnter={() => setHoveredId(app.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Animated Tooltip */}
              <AnimatePresence>
                {hoveredId === app.id && (
                  <motion.div
                    key="tooltip"
                    initial={{ opacity: 0, y: 6, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                  >
                    <div className="bg-os-border text-white text-xs font-mono font-bold px-2.5 py-1 whitespace-nowrap shadow-brutal-sm relative">
                      {app.label}
                      {/* Caret arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-os-border" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => handleAppClick(app.id)}
                className={`w-12 h-12 flex items-center justify-center border-3 border-os-border transition-transform active:translate-y-1 ${app.color} ${isOpen ? 'shadow-brutal-active translate-y-0.5' : 'shadow-brutal-sm hover:-translate-y-1'}`}
              >
                <app.icon size={24} className="text-os-border" />
              </button>

              {/* Open Indicator dot */}
              {isOpen && (
                <motion.div
                  layoutId={`indicator-${app.id}`}
                  className="absolute -bottom-1 w-1 h-1 bg-os-border left-1/2 -translate-x-1/2 rounded-full"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
