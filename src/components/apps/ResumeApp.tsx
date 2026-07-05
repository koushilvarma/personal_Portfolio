import { Download, ExternalLink } from 'lucide-react';

const RESUME_URL = '/resume.pdf';

export default function ResumeApp() {
  return (
    <div className="bg-os-window h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b-3 border-os-border bg-yellow-50 shrink-0">
        <span className="font-mono font-bold text-sm">resume.pdf</span>
        <div className="flex gap-2 ml-auto">
          <a
            href={RESUME_URL}
            download="Koushil_Varma_Resume.pdf"
            className="flex items-center gap-1.5 bg-yellow-400 border-2 border-os-border px-3 py-1 text-xs font-bold shadow-brutal-xs hover:-translate-y-0.5 transition-transform active:translate-y-0 active:shadow-none"
          >
            <Download size={14} />
            Download
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white border-2 border-os-border px-3 py-1 text-xs font-bold shadow-brutal-xs hover:-translate-y-0.5 transition-transform active:translate-y-0 active:shadow-none"
          >
            <ExternalLink size={14} />
            Open Tab
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <iframe
        src={`${RESUME_URL}#toolbar=0&navpanes=0`}
        className="flex-1 w-full border-none"
        title="Koushil Varma Resume"
      />
    </div>
  );
}
