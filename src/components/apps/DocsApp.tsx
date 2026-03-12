import { useState } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  Save, Share2, Printer
} from 'lucide-react';

export default function DocsApp() {
  const [content] = useState(
    "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Platform Engineering position. With my background in CSE and my experience with DevOps and cloud-native architectures, I am confident that I would be a valuable addition to your team...\n\nSincerely,\nKoushil Varma"
  );

  const [font, setFont] = useState('font-serif');
  const [size, setSize] = useState('text-base');

  return (
    <div className="h-full bg-gray-100 flex flex-col font-sans overflow-hidden">
      {/* Ribbon / Toolbar */}
      <div className="bg-white border-b-2 border-os-border p-2 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-2">
          <div className="flex gap-1">
             <button className="p-1.5 hover:bg-gray-100 rounded text-blue-600 transition-colors" title="Save">
               <Save size={18} />
             </button>
             <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Print">
               <Printer size={18} />
             </button>
          </div>
          <div className="h-6 w-[2px] bg-gray-200" />
          <div className="flex items-center gap-2">
            <select 
              className="text-xs border-2 border-os-border p-1 font-mono outline-none"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="font-serif">Times New Roman</option>
              <option value="font-sans">Arial</option>
              <option value="font-mono">Courier New</option>
            </select>
            <select 
              className="text-xs border-2 border-os-border p-1 font-mono outline-none w-16"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="text-xs">10</option>
              <option value="text-sm">12</option>
              <option value="text-base">14</option>
              <option value="text-lg">16</option>
              <option value="text-xl">18</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded font-bold transition-colors"><Bold size={16} /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><Italic size={16} /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors underline"><Underline size={16} /></button>
          </div>
          <div className="h-6 w-[2px] bg-gray-200" />
          <div className="flex gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><AlignLeft size={16} /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><AlignCenter size={16} /></button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><AlignRight size={16} /></button>
          </div>
          <div className="flex-1" />
          <button className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-brutal-xs active:translate-y-0.5 active:shadow-none">
            <Share2 size={14} />
            Share
          </button>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-gray-200/50">
        <div className={`w-full max-w-[550px] min-h-[800px] bg-white border-2 border-os-border shadow-brutal-md p-12 focus:outline-none ${font} ${size} leading-relaxed whitespace-pre-wrap`}
             contentEditable 
             suppressContentEditableWarning={true}>
          {content}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-blue-700 text-white text-[10px] px-3 flex items-center justify-between shrink-0 font-medium">
        <div className="flex gap-4">
          <span>Page 1 of 1</span>
          <span>48 words</span>
        </div>
        <div className="flex gap-4 items-center">
          <span>Focus Mode</span>
          <div className="w-24 h-2 bg-blue-900/50 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-white/50" />
          </div>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
