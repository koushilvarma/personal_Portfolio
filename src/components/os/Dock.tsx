import { useStore } from '../../store/osStore';
import type { WindowId } from '../../store/osStore';
import { UserCircle, Code2, FolderGit2, CalendarDays, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const apps = [
  { id: 'about' as WindowId, label: 'About', icon: UserCircle, color: 'bg-blue-400' },
  { id: 'skills' as WindowId, label: 'Skills', icon: Code2, color: 'bg-green-400' },
  { id: 'projects' as WindowId, label: 'Projects', icon: FolderGit2, color: 'bg-purple-400' },
  { id: 'timeline' as WindowId, label: 'Timeline', icon: CalendarDays, color: 'bg-orange-400' },
  { id: 'contact' as WindowId, label: 'Contact', icon: Mail, color: 'bg-red-400' },
];

export default function Dock() {
  const { windows, openWindow, focusWindow } = useStore();

  const handleAppClick = (id: WindowId) => {
    if (!windows[id].isOpen) {
      openWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-os-window border-3 border-os-border p-2 shadow-brutal-md flex gap-2">
        {apps.map((app) => {
          const isOpen = windows[app.id].isOpen;

          return (
            <div key={app.id} className="relative group">
              <button
                onClick={() => handleAppClick(app.id)}
                className={`w-12 h-12 flex items-center justify-center border-3 border-os-border transition-transform active:translate-y-1 ${app.color} ${isOpen ? 'shadow-brutal-active translate-y-0.5' : 'shadow-brutal-sm hover:-translate-y-1'}`}
              >
                <app.icon size={24} className="text-os-border" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-os-window border-3 border-os-border px-2 py-1 font-mono text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-brutal-sm">
                {app.label}
              </div>

              {/* Open Indicator */}
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
