import MenuBar from './components/os/MenuBar';
import Dock from './components/os/Dock';
import Window from './components/os/Window';
import CommandPalette from './components/os/CommandPalette';
import BackgroundAnimations from './components/os/BackgroundAnimations';

import AboutApp from './components/apps/AboutApp';
import SkillsApp from './components/apps/SkillsApp';
import ProjectsApp from './components/apps/ProjectsApp';
import TimelineApp from './components/apps/TimelineApp';
import ContactApp from './components/apps/ContactApp';
import ResumeApp from './components/apps/ResumeApp';
import PaintApp from './components/apps/PaintApp';
import CalculatorApp from './components/apps/CalculatorApp';

import { useStore } from './store/osStore';

function App() {
  const { isCommandPaletteOpen, setCommandPalette, windows } = useStore();

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
        </div>

      </main>

      <Dock />
      <CommandPalette />
    </div>
  );
}

export default App;
