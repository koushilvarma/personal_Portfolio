import { FileText, Download, ExternalLink } from 'lucide-react';

export default function ResumeApp() {
  return (
    <div className="p-6 bg-os-window h-full flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-yellow-100 border-3 border-os-border shadow-brutal-sm flex items-center justify-center mb-6">
        <FileText size={48} className="text-os-border" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Resume / CV</h2>
      <p className="text-gray-600 mb-8 max-w-sm">
        My professional resume detailing my experience, education, and technical certifications.
      </p>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button className="flex items-center justify-center gap-2 bg-yellow-400 border-3 border-os-border py-3 px-6 font-bold shadow-brutal-sm hover:-translate-y-1 transition-transform active:translate-y-0 active:shadow-none">
          <Download size={20} />
          Download PDF
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border-3 border-os-border py-3 px-6 font-bold shadow-brutal-sm hover:-translate-y-1 transition-transform active:translate-y-0 active:shadow-none">
          <ExternalLink size={20} />
          View Online
        </button>
      </div>

      <div className="mt-12 text-xs text-gray-500 font-mono italic">
        * Fully interactive resume viewer coming soon!
      </div>
    </div>
  );
}
