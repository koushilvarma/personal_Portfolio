import { Copy, Terminal, Github, Linkedin, Mail } from 'lucide-react';

export default function ContactApp() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple visual feedback could be added here
  };

  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm h-full flex flex-col">
      
      {/* Fake Editor Header */}
      <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#333333]">
        <Terminal size={14} className="text-[#569cd6]" />
        <span className="text-[#9cdcfe]">contact.sh</span>
        <span className="text-[#808080] ml-2 text-xs">~/scripts</span>
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex">
          <span className="text-[#858585] w-8 text-right pr-4 select-none">1</span>
          <span className="text-[#6a9955]">#!/bin/bash</span>
        </div>
        <div className="flex">
          <span className="text-[#858585] w-8 text-right pr-4 select-none">2</span>
          <span></span>
        </div>
        <div className="flex">
          <span className="text-[#858585] w-8 text-right pr-4 select-none">3</span>
          <span className="text-[#6a9955]"># Initialize connection parameters</span>
        </div>
        
        {/* Email */}
        <div className="flex group relative mt-2">
          <span className="text-[#858585] w-8 text-right pr-4 select-none pt-2">4</span>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 pt-2">
            <div>
              <span className="text-[#4fc1ff]">export</span> <span className="text-[#9cdcfe]">EMAIL</span><span className="text-[#d4d4d4]">=</span><span className="text-[#ce9178]">"koushil@example.com"</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-2px]">
              <a href="mailto:koushil@example.com" className="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#404040] p-1 rounded text-xs flex items-center gap-1 transition-colors">
                <Mail size={12} /> Send
              </a>
              <button onClick={() => copyToClipboard('koushil@example.com')} className="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#404040] p-1 rounded text-xs flex items-center gap-1 transition-colors">
                <Copy size={12} /> Copy
              </button>
            </div>
          </div>
        </div>

        {/* GitHub */}
        <div className="flex group relative">
          <span className="text-[#858585] w-8 text-right pr-4 select-none pt-2">5</span>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 pt-2">
            <div>
              <span className="text-[#4fc1ff]">export</span> <span className="text-[#9cdcfe]">GITHUB</span><span className="text-[#d4d4d4]">=</span><span className="text-[#ce9178]">"github.com/koushilvarma"</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-2px]">
              <a href="https://github.com/koushilvarma" target="_blank" rel="noopener noreferrer" className="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#404040] p-1 rounded text-xs flex items-center gap-1 transition-colors">
                <Github size={12} /> Open
              </a>
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex group relative">
          <span className="text-[#858585] w-8 text-right pr-4 select-none pt-2">6</span>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 pt-2">
            <div>
              <span className="text-[#4fc1ff]">export</span> <span className="text-[#9cdcfe]">LINKEDIN</span><span className="text-[#d4d4d4]">=</span><span className="text-[#ce9178]">"linkedin.com/in/koushil"</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-[-2px]">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-[#404040] p-1 rounded text-xs flex items-center gap-1 transition-colors">
                <Linkedin size={12} /> Open
              </a>
            </div>
          </div>
        </div>

        <div className="flex mt-4 pt-4">
          <span className="text-[#858585] w-8 text-right pr-4 select-none">7</span>
          <span className="text-[#c586c0]">if</span> <span className="text-[#d4d4d4]">[</span> <span className="text-[#ce9178]">"$PING"</span> <span className="text-[#d4d4d4]">==</span> <span className="text-[#ce9178]">"true"</span> <span className="text-[#d4d4d4]">];</span> <span className="text-[#c586c0]">then</span>
        </div>
        <div className="flex">
          <span className="text-[#858585] w-8 text-right pr-4 select-none">8</span>
          <span className="pl-4"><span className="text-[#dcdcaa]">echo</span> <span className="text-[#ce9178]">"Ready to build scalable systems."</span></span>
        </div>
        <div className="flex">
          <span className="text-[#858585] w-8 text-right pr-4 select-none">9</span>
          <span className="text-[#c586c0]">fi</span>
        </div>
        <div className="flex">
          <span className="text-[#858585] w-8 text-right pr-4 select-none">10</span>
          <span><span className="text-[#c586c0]">exit</span> <span className="text-[#b5cea8]">0</span></span>
        </div>
      </div>
      
      {/* Fake status bar */}
      <div className="mt-auto pt-2 border-t border-[#333333] flex justify-between text-[#858585] text-[10px] uppercase">
        <span>Ln 10, Col 7</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>Bash</span>
      </div>
    </div>
  );
}
