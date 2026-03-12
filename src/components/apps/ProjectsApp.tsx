import { useState } from 'react';
import { FolderGit2, FileCode2, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 'placley',
    title: 'Placley - Campus Placement Portal',
    description: 'A comprehensive campus placement management system featuring real-time job tracking, student resume management, and recruitment analytics for colleges.',
    tags: ['Next.js', 'PostgreSQL', 'Auth.js', 'Prisma'],
    year: '2025',
    link: 'https://github.com/koushilvarma/placley',
    color: 'bg-gray-200',
  },
  {
    id: 'lms_application',
    title: 'Learning Management System',
    description: 'Scalable LMS platform with course management, progress tracking, and interactive assessment modules for educational environments.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    year: '2025',
    link: 'https://github.com/koushilvarma/lms_application',
    color: 'bg-gray-300',
  },
  {
    id: 'workflowautomation',
    title: 'Workflow Automation App',
    description: 'Low-code automation engine for streamlining repetitive tasks across various platforms with custom triggers and event-driven architectures.',
    tags: ['TypeScript', 'Go', 'Redis', 'BullMQ'],
    year: '2025',
    link: 'https://github.com/koushilvarma/workflowautomation_application',
    color: 'bg-gray-200',
  },
  {
    id: 'personal_Portfolio',
    title: 'personal_Portfolio',
    description: 'B2B Neo-Brutalist OS themed personal developer portfolio built with React, Vite, Tailwind CSS, Framer Motion and Zustand state management for window controls.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
    year: '2026',
    link: 'https://github.com/koushilvarma/personal_Portfolio',
    color: 'bg-gray-300',
  },
  {
    id: 'docker_demo',
    title: 'docker_demo',
    description: 'Containerization examples and Dockerfile best practices demonstrating multi-stage builds and minimal image surface area for secure deployments.',
    tags: ['Docker', 'Shell', 'DevOps'],
    year: '2025',
    link: 'https://github.com/koushilvarma/docker_demo',
    color: 'bg-gray-200',
  },
];

export default function ProjectsApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col md:flex-row bg-os-main">
      {/* Sidebar: File Explorer */}
      <div className="w-full md:w-1/3 border-b-3 md:border-b-0 md:border-r-3 border-os-border flex flex-col bg-white">
        <div className="p-2 border-b-3 border-os-border font-bold text-xs uppercase bg-gray-200">
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto brutal-scrollbar p-2">
          {projects.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full flex items-center gap-2 p-2 text-left text-sm font-bold border-2 mb-1 transition-colors ${
                selectedId === p.id 
                  ? 'bg-os-border text-white border-os-border' 
                  : 'bg-transparent text-os-border border-transparent hover:border-os-border'
              }`}
            >
              <FolderGit2 size={16} className={selectedId === p.id ? 'text-white' : 'text-gray-500'} />
              <span className="truncate">{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: File Preview */}
      <div className="flex-1 overflow-y-auto brutal-scrollbar p-6">
        {!selectedId ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-os-border/40 font-bold">
            <FolderGit2 size={48} className="mb-4 opacity-50" />
            <p>SELECT_A_PROJECT_TO_VIEW_DETAILS</p>
          </div>
        ) : (
          (() => {
            const project = projects.find(p => p.id === selectedId)!;
            return (
              <div className={`border-3 border-os-border shadow-brutal-md p-6 bg-white`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 border-3 border-os-border ${project.color}`}>
                      <FileCode2 size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight">{project.title}</h2>
                      <p className="font-mono text-xs font-bold text-gray-500">LAST_MODIFIED: {project.year}</p>
                    </div>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-os-border text-white border-3 border-os-border shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-active transition-all"
                    title="View Source"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap bg-gray-100 p-4 border-2 border-os-border mb-6">
                  {project.description}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="font-bold text-xs uppercase flex items-center mr-2">STACK:</span>
                  {project.tags.map(tag => (
                    <span 
                      key={tag}
                      className={`font-mono text-xs px-2 py-1 border-2 border-os-border font-bold ${project.color}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
