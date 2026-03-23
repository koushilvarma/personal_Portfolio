import { FileText, Loader2 } from 'lucide-react';

export default function ResumeApp() {
  return (
    <div className="p-6 bg-os-window h-full flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-yellow-100 border-3 border-os-border shadow-brutal-sm flex items-center justify-center mb-6">
        <FileText size={48} className="text-os-border" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Resume</h2>
      <div className="flex items-center gap-2 text-gray-600 mb-8 bg-white border-2 border-os-border px-4 py-2 shadow-brutal-xs">
        <Loader2 size={18} className="animate-spin" />
        <span className="font-mono font-bold">UPDATING RESUME...</span>
      </div>
      <p className="text-sm text-gray-500 max-w-sm font-mono">
        A brand new version of my professional resume is currently being finalized. Check back very soon!
      </p>
    </div>
  );
}
