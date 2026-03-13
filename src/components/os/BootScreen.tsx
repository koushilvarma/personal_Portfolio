import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const bootLines = [
  "KV_BIOS (C) 2026 Koushil Varma Corp.",
  "BIOS Date 03/13/26 10:15:00 Ver 1.0.0",
  "CPU: Koushil Varma Core Processor @ 3.4GHz",
  "Speed: 3.4 GHz",
  "",
  "Memory Test: 4194304K OK",
  "",
  "Initializing USB Controllers .. Done.",
  "2048MB RAM System Type: KV_OS-64",
  "",
  "Auto-Detecting Pri Master .. IDE Hard Disk",
  "Auto-Detecting Pri Slave  .. Not Detected",
  "Pri Master: KV-SSD-1TB-PRO",
  "",
  "Loading Kernel ....................... OK",
  "Mounting File Systems ................ OK",
  "Initializing UI Services ............. OK",
  "",
  "System is ready.",
  "Starting KV_OS GUI..."
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Typing effect
    let currentLine = 0;
    
    const typeLine = () => {
      if (currentLine < bootLines.length) {
        setVisibleLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
        
        // Add random slight delays for realism
        const delay = Math.random() * 150 + 50; 
        
        // Pause longer before the GUI starts
        if (currentLine === bootLines.length - 1) {
          setTimeout(typeLine, 1000);
        } else {
          setTimeout(typeLine, delay);
        }
      } else {
        // Finished booting
        setTimeout(() => {
          clearInterval(cursorInterval);
          onComplete();
        }, 800);
      }
    };

    // Start boot sequence after a tiny delay
    setTimeout(typeLine, 500);

    return () => clearInterval(cursorInterval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-black text-[#00ff00] font-mono p-4 md:p-8 overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto h-full flex flex-col justify-end pb-8">
        <div>
           {visibleLines.map((line, index) => (
            <div key={index} className="text-xs md:text-sm lg:text-base leading-relaxed break-all">
              {line}
            </div>
          ))}
          <div className="flex items-center mt-1">
            <span className="text-xs md:text-sm lg:text-base">{'>'}</span>
            <span className={`w-2.5 h-4 bg-[#00ff00] ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        </div>
      </div>
      
      {/* Decorative monitor scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 hidden md:block" />
    </motion.div>
  );
}
