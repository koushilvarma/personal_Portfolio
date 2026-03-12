import { useState } from 'react';
import { Folder, FileText, ImageIcon, Music, Code, ChevronRight, HardDrive } from 'lucide-react';
import { useStore } from '../../store/osStore';

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  icon?: any;
  category?: 'projects' | 'docs' | 'media';
}

export default function FinderApp() {
  const { openWindow } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<'root' | 'projects' | 'docs' | 'media'>('root');

  const files: Record<string, FileNode[]> = {
    root: [
      { name: 'Projects', type: 'folder', icon: Folder, category: 'projects' },
      { name: 'Documents', type: 'folder', icon: Folder, category: 'docs' },
      { name: 'Media', type: 'folder', icon: Folder, category: 'media' },
      { name: 'README.md', type: 'file', icon: FileText, size: '2KB' },
    ],
    projects: [
      { name: 'Portfolio_OS', type: 'file', icon: Code, size: '45MB' },
      { name: 'E-commerce_V2', type: 'file', icon: Code, size: '120MB' },
      { name: 'AI_Chat_Bot', type: 'file', icon: Code, size: '12MB' },
    ],
    docs: [
      { name: 'Resume_2026.pdf', type: 'file', icon: FileText, size: '1.2MB' },
      { name: 'Project_Architecture.docx', type: 'file', icon: FileText, size: '450KB' },
    ],
    media: [
      { name: 'Avatar.png', type: 'file', icon: ImageIcon, size: '2.4MB' },
      { name: 'System_Start.mp3', type: 'file', icon: Music, size: '800KB' },
    ]
  };

  const handleItemClick = (file: FileNode) => {
    if (file.type === 'folder' && file.category) {
      setSelectedCategory(file.category);
    } else if (file.name.includes('Portfolio_OS')) {
        openWindow('projects');
    } else if (file.name.includes('Resume')) {
        openWindow('resume');
    }
  };

  return (
    <div className="h-full flex bg-os-bg-white overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-1/4 bg-os-window border-r-3 border-os-border p-4 flex flex-col gap-6 hidden sm:flex">
        <div className="space-y-4">
          <p className="font-bold text-[10px] opacity-40 uppercase tracking-widest">Favorites</p>
          <div className="space-y-1">
            <button 
              onClick={() => setSelectedCategory('root')}
              className={`w-full flex items-center gap-2 p-2 font-bold text-xs hover:bg-os-bg-yellow border-2 border-transparent transition-colors ${selectedCategory === 'root' ? 'bg-os-bg-yellow border-os-border' : ''}`}
            >
              <HardDrive size={16} /> Macintosh HD
            </button>
            <button 
              onClick={() => setSelectedCategory('projects')}
              className={`w-full flex items-center gap-2 p-2 font-bold text-xs hover:bg-os-bg-yellow border-2 border-transparent transition-colors ${selectedCategory === 'projects' ? 'bg-os-bg-yellow border-os-border' : ''}`}
            >
              <Code size={16} /> Projects
            </button>
            <button 
              onClick={() => setSelectedCategory('docs')}
              className={`w-full flex items-center gap-2 p-2 font-bold text-xs hover:bg-os-bg-yellow border-2 border-transparent transition-colors ${selectedCategory === 'docs' ? 'bg-os-bg-yellow border-os-border' : ''}`}
            >
              <FileText size={16} /> Documents
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Path Breadcrumb */}
        <div className="bg-os-window border-b-3 border-os-border p-2 flex items-center gap-2 text-xs font-mono font-bold">
            <span className="opacity-40">KV_OS</span>
            <ChevronRight size={12} className="opacity-40" />
            <span className="opacity-40">Users</span>
            <ChevronRight size={12} className="opacity-40" />
            <span className="opacity-40">Koushil</span>
            <ChevronRight size={12} className="opacity-40" />
            <span className="capitalize">{selectedCategory === 'root' ? 'Macintosh HD' : selectedCategory}</span>
        </div>

        {/* File Grid */}
        <div className="flex-1 p-4 overflow-auto brutal-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files[selectedCategory].map((file, i) => {
              const Icon = file.icon;
              return (
                <div 
                  key={i}
                  onDoubleClick={() => handleItemClick(file)}
                  className="flex flex-col items-center gap-2 p-4 border-2 border-transparent hover:border-os-border hover:bg-os-bg-yellow/20 cursor-pointer group transition-all rounded-lg active:scale-95"
                >
                  <div className="bg-os-window border-3 border-os-border p-3 shadow-brutal-sm group-hover:-translate-y-1 transition-transform group-active:shadow-brutal-active">
                    <Icon size={32} className="text-os-border" />
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] font-bold text-center leading-tight">{file.name}</span>
                    {file.size && <span className="text-[8px] opacity-40 font-mono">{file.size}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
