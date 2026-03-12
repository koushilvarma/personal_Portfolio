import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useStore } from '../../store/osStore';
import type { WindowId } from '../../store/osStore';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: WindowId;
  children: React.ReactNode;
}

export default function Window({ id, children }: WindowProps) {
  const windowState = useStore((state) => state.windows[id]);
  const { closeWindow, toggleMinimize, focusWindow } = useStore();
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: windowState.defaultX, y: windowState.defaultY });

  // Handle z-index stacking effect correctly on mount
  useEffect(() => {
    if (windowState.isOpen) {
      focusWindow(id);
    }
  }, [windowState.isOpen]);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    focusWindow(id);
    dragControls.start(e);
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      // We don't save position to allow restoring
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
    }
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 32 : position.y, // 32 is menu bar height
        width: isMaximized ? '100vw' : windowState.width,
        height: isMaximized ? 'calc(100vh - 32px - 80px)' : windowState.height, // 80px for dock approx padding
      }}
      exit={{ scale: 0.95, opacity: 0, y: 50 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
      onDragEnd={(_, info) => {
        setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y });
      }}
      onMouseDown={() => focusWindow(id)}
      style={{ zIndex: windowState.zIndex }}
      className={`absolute bg-os-window border-3 border-os-border flex flex-col shadow-brutal-lg pointer-events-auto ${isMaximized ? '' : 'resize overflow-hidden'}`}
    >
      {/* Title Bar */}
      <div 
        className="h-8 bg-os-border flex items-center justify-between px-2 cursor-grab active:cursor-grabbing shrink-0 select-none"
        onPointerDown={handlePointerDown}
        onDoubleClick={handleMaximize}
      >
        <span className="font-mono text-white text-xs font-bold pl-2 truncate pointer-events-none">
          {windowState.title}
        </span>
        
        <div className="flex gap-1.5 shrink-0 ml-4 pointer-events-auto">
          {/* Minimize */}
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
            className="w-5 h-5 bg-yellow-400 border-2 border-transparent hover:border-white flex items-center justify-center transition-colors"
          >
            <Minus size={12} strokeWidth={3} className="text-os-border" />
          </button>
          {/* Maximize */}
          <button 
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            className="w-5 h-5 bg-green-400 border-2 border-transparent hover:border-white flex items-center justify-center transition-colors"
          >
            <Maximize2 size={10} strokeWidth={3} className="text-os-border" />
          </button>
          {/* Close */}
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="w-5 h-5 bg-red-500 border-2 border-transparent hover:border-white flex items-center justify-center transition-colors"
          >
            <X size={12} strokeWidth={3} className="text-os-border" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-os-window overflow-auto brutal-scrollbar relative h-full">
        {children}
      </div>
      
      {/* Corner Resizer Visual (Functional resize handled by CSS) */}
      {!isMaximized && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize pointer-events-none flex flex-col justify-end items-end p-0.5 gap-[2px]">
            <div className="w-[2px] h-[2px] bg-os-border" />
            <div className="flex gap-[2px]">
                <div className="w-[2px] h-[2px] bg-os-border" />
                <div className="w-[2px] h-[2px] bg-os-border" />
            </div>
            <div className="flex gap-[2px]">
                <div className="w-[2px] h-[2px] bg-os-border" />
                <div className="w-[2px] h-[2px] bg-os-border" />
                <div className="w-[2px] h-[2px] bg-os-border" />
            </div>
        </div>
      )}
    </motion.div>
  );
}
