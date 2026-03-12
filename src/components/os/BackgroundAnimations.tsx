import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Code2, Database, Shield, Box, Server, GitBranch, 
  Cpu, Globe, Wifi, Cloud, Layers, Activity, HardDrive 
} from 'lucide-react';

const shapes = [
  { id: 1, type: 'square', size: 60, startX: 10, startY: 20 },
  { id: 2, type: 'circle', size: 40, startX: 80, startY: 15 },
  { id: 3, type: 'icon', icon: Terminal, color: 'text-blue-500', size: 50, startX: 25, startY: 70 },
  { id: 4, type: 'icon', icon: Code2, color: 'text-green-500', size: 55, startX: 75, startY: 80 },
  { id: 5, type: 'star', size: 45, startX: 50, startY: 40 },
  { id: 6, type: 'icon', icon: Database, color: 'text-yellow-500', size: 45, startX: 15, startY: 50 },
  { id: 7, type: 'icon', icon: Server, color: 'text-purple-500', size: 60, startX: 85, startY: 45 },
  { id: 8, type: 'icon', icon: GitBranch, color: 'text-orange-500', size: 40, startX: 40, startY: 10 },
  { id: 9, type: 'icon', icon: Shield, color: 'text-red-500', size: 50, startX: 60, startY: 90 },
  { id: 10, type: 'icon', icon: Box, color: 'text-teal-500', size: 45, startX: 50, startY: 65 },
  { id: 11, type: 'icon', icon: Cpu, color: 'text-gray-500', size: 55, startX: 5, startY: 85 },
  { id: 12, type: 'icon', icon: Globe, color: 'text-cyan-500', size: 50, startX: 90, startY: 70 },
  { id: 13, type: 'icon', icon: Wifi, color: 'text-indigo-500', size: 40, startX: 30, startY: 30 },
  { id: 14, type: 'icon', icon: Cloud, color: 'text-sky-400', size: 65, startX: 70, startY: 5 },
  { id: 15, type: 'icon', icon: Layers, color: 'text-emerald-500', size: 45, startX: 20, startY: 10 },
  { id: 16, type: 'icon', icon: Activity, color: 'text-rose-500', size: 50, startX: 10, startY: 40 },
  { id: 17, type: 'icon', icon: HardDrive, color: 'text-slate-500', size: 55, startX: 80, startY: 90 },
];

export default function BackgroundAnimations({ isActive }: { isActive: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`}
    >
      {/* Subtle Background Branding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 0.07, 
          y: [0, -15, 0],
        }}
        transition={{ 
          opacity: { duration: 2 },
          y: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute inset-0 flex items-center justify-center select-none"
      >
        <h1 className="text-[12vw] md:text-[18vw] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-os-border via-os-border/50 to-transparent opacity-100">
          Koushil Varma
        </h1>
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
            {shape.type === 'icon' && shape.icon && (
              <shape.icon 
                strokeWidth={2.5} 
                className={`w-full h-full drop-shadow-[4px_4px_0_rgba(17,17,17,1)] ${shape.color} select-none`} 
              />
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
