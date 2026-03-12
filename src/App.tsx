import MenuBar from './components/os/MenuBar';
import Dock from './components/os/Dock';
import Window from './components/os/Window';
import CommandPalette from './components/os/CommandPalette';
import BackgroundAnimations from './components/os/BackgroundAnimations';
import { Monitor } from 'lucide-react';
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

import { useStore } from './store/osStore';

function App() {
  const { isCommandPaletteOpen, setCommandPalette, windows, isPoweredOff, isSleeping } = useStore();

  const isAnyWindowOpen = Object.values(windows).some(w => w.isOpen && !w.isMinimized);

  return (
    <div 
      className="w-screen h-screen overflow-hidden bg-os-bg-yellow bg-[radial-gradient(#dbc516_1px,transparent_1px)] [background-size:20px_20px] relative font-sans"
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
        <div className="absolute inset-0 pointer-events-auto overflow-hidden">
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
                duration: 10,
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
