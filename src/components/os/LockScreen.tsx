import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);
    // Simulate auth delay
    setTimeout(() => {
      onUnlock();
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-10vh', transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-os-bg-yellow bg-[radial-gradient(var(--os-border)_0.5px,transparent_0.5px)] [background-size:20px_20px] flex flex-col items-center justify-center font-sans select-none"
    >
      {/* Clock section */}
      <div className="absolute top-16 md:top-32 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-os-border drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">
          {timeString}
        </h1>
        <p className="text-lg md:text-xl font-bold mt-4 tracking-widest uppercase bg-white border-2 border-os-border px-4 py-1 shadow-brutal-sm">
          {dateString}
        </p>
      </div>

      {/* Login Section */}
      <div className="w-full max-w-sm mt-32 md:mt-20">
        <motion.div 
          className="bg-white border-4 border-os-border shadow-brutal-lg p-8 flex flex-col items-center"
          animate={isUnlocking ? { scale: 0.95, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Avatar */}
          <div className="w-24 h-24 bg-blue-100 border-4 border-os-border mb-6 flex items-center justify-center shadow-brutal-sm relative">
             <img 
               src="https://avatars.githubusercontent.com/u/143738079?v=4" 
               alt="Koushil Varma"
               className="w-full h-full object-cover"
             />
             <div className="absolute -bottom-3 -right-3 bg-yellow-400 border-2 border-os-border p-1 shadow-brutal-xs">
               {isUnlocking ? <Unlock size={16} /> : <Lock size={16} />}
             </div>
          </div>

          <h2 className="text-2xl font-black mb-1">Koushil Varma</h2>
          <p className="text-xs font-mono font-bold text-gray-500 mb-8 border-b-2 border-os-border/20 pb-2 w-full text-center">
            GUEST ACCOUNT
          </p>

          <form onSubmit={handleUnlock} className="w-full flex gap-2">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter PIN (Optional)"
              className="flex-1 border-3 border-os-border bg-gray-50 px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-os-border focus:bg-yellow-50 transition-colors placeholder:text-gray-400"
            />
            <button 
              type="submit"
              disabled={isUnlocking}
              className="bg-os-border text-white px-3 py-2 border-3 border-os-border hover:bg-white hover:text-os-border transition-colors active:translate-y-0.5"
            >
              {isUnlocking ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Lock size={18} />
                </motion.div>
              ) : (
                <ArrowRight size={18} />
              )}
            </button>
          </form>
          
          <p className="text-[10px] font-mono mt-4 text-center opacity-70">
            For demo purposes, password is not required. Just click login.
          </p>
        </motion.div>
      </div>

    </motion.div>
  );
}
