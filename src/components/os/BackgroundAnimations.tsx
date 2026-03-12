import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Code2, Database, Shield, Box, Server, GitBranch, 
  Cpu, Globe, Wifi, Cloud, Layers, Activity, HardDrive, UserCircle, FileText, 
  Gamepad2, Music, Heart, Camera, Github, Linkedin, MessageSquare, Settings, Search, Layout,
  Smartphone, Rocket, Zap, Coffee, Palette, Calculator, Terminal
} from 'lucide-react';

const shapes = [
  { id: 1, type: 'square', label: 'Data', size: 60, startX: 10, startY: 20 },
  { id: 2, type: 'circle', label: 'System', size: 40, startX: 80, startY: 15 },
  { id: 3, type: 'icon', icon: Terminal, label: 'Terminal', color: 'text-blue-500', size: 50, startX: 25, startY: 70 },
  { id: 4, type: 'icon', icon: Code2, label: 'Source', color: 'text-green-500', size: 55, startX: 75, startY: 80 },
  { id: 5, type: 'star', label: 'Feature', size: 45, startX: 50, startY: 40 },
  { id: 6, type: 'icon', icon: Database, label: 'Storage', color: 'text-yellow-500', size: 45, startX: 15, startY: 50 },
  { id: 7, type: 'icon', icon: Server, label: 'Server', color: 'text-purple-500', size: 60, startX: 85, startY: 45 },
  { id: 8, type: 'icon', icon: GitBranch, label: 'Branch', color: 'text-orange-500', size: 40, startX: 40, startY: 10 },
  { id: 9, type: 'icon', icon: Shield, label: 'Security', color: 'text-red-500', size: 50, startX: 60, startY: 90 },
  { id: 10, type: 'icon', icon: Box, label: 'Package', color: 'text-teal-500', size: 45, startX: 50, startY: 65 },
  { id: 11, type: 'icon', icon: Cpu, label: 'Core', color: 'text-gray-500', size: 55, startX: 5, startY: 85 },
  { id: 12, type: 'icon', icon: Globe, label: 'Network', color: 'text-cyan-500', size: 50, startX: 90, startY: 70 },
  { id: 13, type: 'icon', icon: Wifi, label: 'Connect', color: 'text-indigo-500', size: 40, startX: 30, startY: 30 },
  { id: 14, type: 'icon', icon: Cloud, label: 'Cloud', color: 'text-sky-400', size: 65, startX: 70, startY: 5 },
  { id: 15, type: 'icon', icon: Layers, label: 'Layers', color: 'text-emerald-500', size: 45, startX: 20, startY: 10 },
  { id: 16, type: 'icon', icon: Activity, label: 'Monitor', color: 'text-rose-500', size: 50, startX: 10, startY: 40 },
  { id: 17, type: 'icon', icon: HardDrive, label: 'Drive', color: 'text-slate-500', size: 55, startX: 80, startY: 90 },
  { id: 18, type: 'icon', icon: FileText, label: 'Resume', color: 'text-yellow-400', size: 60, startX: 40, startY: 80 },
  { id: 19, type: 'icon', icon: Gamepad2, label: 'Gaming', color: 'text-purple-400', size: 50, startX: 30, startY: 85 },
  { id: 20, type: 'icon', icon: Music, label: 'Spotify', color: 'text-pink-400', size: 45, startX: 65, startY: 15 },
  { id: 21, type: 'icon', icon: Heart, label: 'Love', color: 'text-red-400', size: 40, startX: 95, startY: 25 },
  { id: 22, type: 'icon', icon: Camera, label: 'Capture', color: 'text-yellow-400', size: 55, startX: 5, startY: 10 },
  { id: 23, type: 'icon', icon: Github, label: 'Github', color: 'text-gray-300', size: 50, startX: 55, startY: 5 },
  { id: 24, type: 'icon', icon: Linkedin, label: 'Social', color: 'text-blue-600', size: 45, startX: 15, startY: 95 },
  { id: 25, type: 'icon', icon: MessageSquare, label: 'Chat', color: 'text-green-400', size: 50, startX: 85, startY: 35 },
  { id: 26, type: 'icon', icon: Settings, label: 'Config', color: 'text-gray-400', size: 40, startX: 45, startY: 95 },
  { id: 27, type: 'icon', icon: Search, label: 'Browse', color: 'text-blue-300', size: 45, startX: 92, startY: 55 },
  { id: 28, type: 'icon', icon: Layout, label: 'Design', color: 'text-indigo-400', size: 50, startX: 35, startY: 50 },
  { id: 29, type: 'icon', icon: Smartphone, label: 'Mobile', color: 'text-slate-400', size: 45, startX: 60, startY: 75 },
  { id: 30, type: 'icon', icon: Rocket, label: 'Launch', color: 'text-orange-400', size: 60, startX: 70, startY: 60 },
  { id: 31, type: 'icon', icon: Zap, label: 'Speed', color: 'text-yellow-300', size: 40, startX: 10, startY: 60 },
  { id: 32, type: 'icon', icon: Coffee, label: 'Coffee', color: 'text-amber-600', size: 45, startX: 80, startY: 5 },
  { id: 33, type: 'icon', icon: Palette, label: 'Paint', color: 'text-pink-400', size: 55, startX: 25, startY: 45 },
  { id: 34, type: 'icon', icon: Calculator, label: 'Math', color: 'text-blue-400', size: 50, startX: 75, startY: 30 },
  { id: 35, type: 'icon', icon: Terminal, label: 'CMD', color: 'text-zinc-500', size: 45, startX: 45, startY: 30 },
  { id: 36, type: 'icon', icon: Music, label: 'Jams', color: 'text-pink-400', size: 50, startX: 65, startY: 80 },
  { id: 37, type: 'icon', icon: Layout, label: 'Word', color: 'text-blue-500', size: 55, startX: 85, startY: 20 },
];

export default function BackgroundAnimations({ isActive }: { isActive: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`}
    >
      {/* Central OS Identity Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{ 
          opacity: { duration: 1.5 },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute inset-0 flex items-center justify-center select-none"
      >
        <div className="flex flex-col items-center gap-6 opacity-15 hover:opacity-30 transition-opacity duration-500">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-white border-4 border-os-border shadow-brutal-md flex items-center justify-center">
            <UserCircle size={80} className="text-os-border md:hidden" strokeWidth={1.5} />
            <UserCircle size={120} className="text-os-border hidden md:block" strokeWidth={1.5} />
          </div>
          <div className="px-8 py-2 bg-os-border text-white text-xl md:text-4xl font-bold font-mono tracking-tight shadow-brutal-sm">
            Koushil Varma
          </div>
        </div>
      </motion.div>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          drag
          dragMomentum={false}
          className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
          initial={{
            x: `${shape.startX}vw`,
            y: `${shape.startY}vh`,
          }}
          style={{ width: shape.size, height: shape.size, zIndex: 0 }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{
              rotate: [0, 90, 180, 270, 360],
              x: [0, 15, -15, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 20 + shape.id * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {shape.type === 'icon' && shape.icon && (
              <div className="flex flex-col items-center">
                <shape.icon 
                  strokeWidth={2.5} 
                  className={`w-full h-full drop-shadow-[4px_4px_0_rgba(17,17,17,1)] ${shape.color} select-none`} 
                />
                <span className="mt-2 bg-os-border text-white text-[10px] px-1.5 py-0.5 font-mono font-bold shadow-brutal-xs whitespace-nowrap">
                  {shape.label}
                </span>
              </div>
            )}
            {(shape.type === 'square' || shape.type === 'circle' || shape.type === 'star') && (
              <div className="flex flex-col items-center">
                {shape.type === 'square' && (
                  <div className="w-full h-full bg-blue-400 border-4 border-os-border shadow-brutal-md" />
                )}
                {shape.type === 'circle' && (
                  <div className="w-full h-full bg-green-400 border-4 border-os-border rounded-full shadow-brutal-md" />
                )}
                {shape.type === 'star' && (
                  <div className="font-bold text-6xl text-yellow-400 drop-shadow-[4px_4px_0_rgba(17,17,17,1)] select-none" style={{ WebkitTextStroke: '3px #111' }}>
                    *
                  </div>
                )}
                <span className="mt-2 bg-os-border text-white text-[10px] px-1.5 py-0.5 font-mono font-bold shadow-brutal-xs whitespace-nowrap">
                  {shape.label}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
