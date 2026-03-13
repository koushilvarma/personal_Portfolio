import { useStore } from '../../store/osStore';
import { Monitor, Layout, Zap } from 'lucide-react';

export default function SystemSettingsApp() {
  const { theme, setTheme, softwareUpdate } = useStore();

  const themes = [
    { id: 'yellow' as const, name: 'Neo Yellow', icon: Zap, color: 'bg-[#F5E642]' },
    { id: 'dark' as const, name: 'Cyber Night', icon: Monitor, color: 'bg-[#1A1A1A]' },
    { id: 'classic' as const, name: 'Classic 95', icon: Layout, color: 'bg-[#C0C0C0]' },
  ];

  return (
    <div className="p-8 h-full bg-os-bg-white text-os-border flex flex-col gap-8 overflow-auto brutal-scrollbar">
      <section>
        <h2 className="font-bold text-lg mb-4 underline decoration-4 underline-offset-4">Appearance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex flex-col items-center gap-3 p-4 border-3 border-os-border shadow-brutal-sm transition-all active:translate-x-0.5 active:translate-y-0.5 ${theme === t.id ? 'bg-os-bg-yellow ring-4 ring-os-border ring-inset' : 'bg-os-window hover:-translate-y-1'}`}
            >
              <div className={`${t.color} p-4 border-2 border-os-border rounded-lg`}>
                <t.icon size={32} className={t.id === 'dark' ? 'text-white' : 'text-os-border'} />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest">{t.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4 underline decoration-4 underline-offset-4">System Info</h2>
        <div className="space-y-4 bg-os-window border-3 border-os-border p-4 shadow-brutal-sm font-mono text-sm">
          <div className="flex justify-between border-b-2 border-os-border/10 pb-2">
            <span className="opacity-60">OS Version</span>
            <span className="font-bold">KV_OS v1.2.0-stable</span>
          </div>
          <div className="flex justify-between border-b-2 border-os-border/10 pb-2">
            <span className="opacity-60">Architect</span>
            <span className="font-bold">Koushil Varma</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-60">Kernel Status</span>
            <span className="text-green-600 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4 underline decoration-4 underline-offset-4">System Updates</h2>
        <div className="p-4 border-3 border-os-border bg-os-window shadow-brutal-sm flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">KV_OS v1.3.0 Available</h3>
            <p className="text-[10px] opacity-60">Includes new UI animations and core optimizations.</p>
          </div>
          <button 
            onClick={softwareUpdate}
            className="px-4 py-2 bg-os-bg-yellow border-2 border-os-border font-bold text-xs uppercase tracking-wider shadow-brutal-active active:translate-y-0.5 active:translate-x-0.5 transition-transform"
          >
            Update Now
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-4 underline decoration-4 underline-offset-4">Experimental</h2>
        <div className="p-4 border-3 border-os-border bg-os-window shadow-brutal-sm flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">Performance Mode</h3>
            <p className="text-[10px] opacity-60">Disable background animations for lower CPU usage.</p>
          </div>
          <div className="w-12 h-6 border-2 border-os-border bg-zinc-200 relative cursor-pointer overflow-hidden p-0.5">
             <div className="w-1/2 h-full bg-os-border" />
          </div>
        </div>
      </section>
    </div>
  );
}
