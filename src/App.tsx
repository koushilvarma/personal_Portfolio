import MenuBar from './components/os/MenuBar';
import Dock from './components/os/Dock';
import Window from './components/os/Window';
import CommandPalette from './components/os/CommandPalette';
import BackgroundAnimations from './components/os/BackgroundAnimations';
import { Monitor, Loader2, UserCircle, FolderGit2, FileText, Gamepad2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import AboutApp from './components/apps/AboutApp';
import SkillsApp from './components/apps/SkillsApp';
import ProjectsApp from './components/apps/ProjectsApp';
import TimelineApp from './components/apps/TimelineApp';
import ContactApp from './components/apps/ContactApp';
import ResumeApp from './components/apps/ResumeApp';
import PaintApp from './components/apps/PaintApp';
import CalculatorApp from './components/apps/CalculatorApp';
import TerminalApp from './components/apps/TerminalApp';
import MusicApp from './components/apps/MusicApp';
import DocsApp from './components/apps/DocsApp';
import StickyNotesApp from './components/apps/StickyNotesApp';
import CalendarApp from './components/apps/CalendarApp';
import SystemSettingsApp from './components/apps/SystemSettingsApp';
import ActivityMonitorApp from './components/apps/ActivityMonitorApp';
import FinderApp from './components/apps/FinderApp';
import MessengerApp from './components/apps/MessengerApp';
import RetroGameApp from './components/apps/RetroGameApp';

import { useStore, type WindowId } from './store/osStore';

function App() {
  const { isCommandPaletteOpen, setCommandPalette, windows = {}, isPoweredOff, isSleeping, isRestarting, theme, trashedApps, moveToTrash, openWindow } = useStore();

  const isAnyWindowOpen = Object.values(windows).some((w: any) => w.isOpen && !w.isMinimized);

  const themeClass = theme === 'dark' ? 'theme-dark' : theme === 'classic' ? 'theme-classic' : '';

  const desktopApps: { id: WindowId, label: string, icon: any }[] = [
    { id: 'about', label: 'About Me', icon: UserCircle },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'game', label: 'Snake_Game', icon: Gamepad2 },
  ];

  return (
    <div 
      className={`w-screen h-screen overflow-hidden bg-os-bg-yellow bg-[radial-gradient(var(--os-border)_0.5px,transparent_0.5px)] [background-size:20px_20px] relative font-sans ${themeClass}`}
      onClick={() => isCommandPaletteOpen && setCommandPalette(false)}
    >
      <MenuBar />

      {/* Background Magic */}
      <BackgroundAnimations isActive={!isAnyWindowOpen} />

      {/* Desktop Space */}
      <main className="absolute inset-0 pt-8 pb-20 overflow-hidden pointer-events-none">
        
        {/* Decorative Desktop Elements */}
        <div className="absolute top-20 right-20 w-64 bg-white border-3 border-os-border shadow-brutal-sm p-4 rotate-2 font-mono text-sm shadow-black pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-gray-400 absolute -top-2 left-1/2 -translate-x-1/2 border-2 border-os-border" />
          <strong>TODO:</strong>
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li>Pass AWS cert</li>
            <li>Fix prod memory leak</li>
            <li className="line-through">Deploy Neo-Brutalist portfolio</li>
          </ul>
        </div>

        {/* The Windows (pointer events auto to allow interaction) */}
        <div className="flex-1 relative pointer-events-none p-8 z-10 flex flex-col items-start gap-8">
          {desktopApps.map(app => !trashedApps.has(app.id) && (
            <div 
              key={app.id}
              className="group pointer-events-auto flex flex-col items-center gap-1 cursor-pointer"
              onDoubleClick={() => openWindow(app.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                if (confirm(`Move ${app.label} to Trash?`)) moveToTrash(app.id);
              }}
            >
              <div className="bg-os-window border-3 border-os-border p-3 shadow-brutal-sm group-hover:-translate-y-1 transition-transform group-active:shadow-brutal-active">
                <app.icon size={36} className="text-os-border" />
              </div>
              <span className="font-mono text-[10px] font-bold bg-os-border text-white px-1 uppercase tracking-tighter">
                {app.label}
              </span>
            </div>
          ))}

          {/* Desktop Trash Bin */}
          <div className="absolute bottom-16 right-8 pointer-events-auto">
            <div 
              className="flex flex-col items-center gap-1 group cursor-pointer"
              onDoubleClick={() => openWindow('finder')} // Finder can show trashed items
            >
              <div className="bg-os-window border-3 border-os-border p-3 shadow-brutal-sm group-hover:-translate-y-1 transition-transform">
                <Trash2 size={32} className="text-os-border" />
              </div>
              <span className="font-mono text-[10px] font-bold bg-os-border text-white px-1 uppercase tracking-tighter shadow-black shadow-sm">Trash</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-4 pointer-events-none z-20 flex items-center justify-center">
          <Window id="about"><AboutApp /></Window>
          <Window id="skills"><SkillsApp /></Window>
          <Window id="projects"><ProjectsApp /></Window>
          <Window id="timeline"><TimelineApp /></Window>
          <Window id="contact"><ContactApp /></Window>
          <Window id="resume"><ResumeApp /></Window>
          <Window id="paint"><PaintApp /></Window>
          <Window id="calculator"><CalculatorApp /></Window>
          <Window id="terminal"><TerminalApp /></Window>
          <Window id="music"><MusicApp /></Window>
          <Window id="docs"><DocsApp /></Window>
          <Window id="notes"><StickyNotesApp /></Window>
          <Window id="calendar"><CalendarApp /></Window>
          <Window id="settings"><SystemSettingsApp /></Window>
          <Window id="monitor"><ActivityMonitorApp /></Window>
          <Window id="finder"><FinderApp /></Window>
          <Window id="messenger"><MessengerApp /></Window>
          <Window id="game"><RetroGameApp /></Window>
        </div>

      </main>

      <Dock />
      <CommandPalette />

      <AnimatePresence>
        {isPoweredOff && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center cursor-none"
          >
            <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" />
          </motion.div>
        )}

        {isSleeping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900 z-[9999] flex items-center justify-center cursor-none overflow-hidden"
          >
            <motion.div
              animate={{
                x: ["-40vw", "40vw", "-40vw"],
                y: ["-40vh", "40vh", "-40vh"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex flex-col items-center gap-4 text-white/40"
            >
              <div className="p-6 border-4 border-white/20 rounded-2xl shadow-brutal-md">
                <Monitor size={80} strokeWidth={1.5} />
              </div>
              <span className="font-mono font-bold tracking-[0.5em] text-sm uppercase">KV_OS SLEEP</span>
            </motion.div>
          </motion.div>
        )}

        {isRestarting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-os-window z-[9999] flex items-center justify-center cursor-wait"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-os-border"
              >
                <Loader2 size={60} strokeWidth={1.5} />
              </motion.div>
              <span className="font-mono font-bold text-os-border tracking-widest animate-pulse uppercase">Restarting System...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed bottom-4 left-4 z-0 pointer-events-none select-none">
        <p className="text-[10px] md:text-xs font-mono font-bold text-os-border/20 uppercase tracking-[0.2em]">
          All rights reserved to Koushil Varma ©2026
        </p>
      </div>
    </div>
  );
}

export default App;
