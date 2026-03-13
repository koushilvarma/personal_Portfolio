import { create } from 'zustand';

export type WindowId = 'about' | 'skills' | 'projects' | 'timeline' | 'contact' | 'resume' | 'paint' | 'calculator' | 'terminal' | 'music' | 'docs' | 'finder' | 'settings' | 'notes' | 'monitor' | 'messenger' | 'calendar' | 'game';

export type ThemeId = 'yellow' | 'dark' | 'classic';

interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  width: number;
  height: number;
  defaultX: number;
  defaultY: number;
}

interface OSStore {
  windows: Record<WindowId, WindowState>;
  highestZIndex: number;
  isCommandPaletteOpen: boolean;
  isPoweredOff: boolean;
  isSleeping: boolean;
  isRestarting: boolean;
  isUpdating: boolean;
  theme: ThemeId;
  trashedApps: Set<WindowId>;

  // Window Actions
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  toggleMinimize: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;

  // Command Palette Actions
  toggleCommandPalette: () => void;
  setCommandPalette: (isOpen: boolean) => void;
  powerOff: () => void;
  sleep: () => void;
  restart: () => void;
  softwareUpdate: () => void;

  // Theme & Trash Actions
  setTheme: (theme: ThemeId) => void;
  moveToTrash: (id: WindowId) => void;
  restoreFromTrash: (id: WindowId) => void;
}

const initialWindows: Record<WindowId, WindowState> = {
  about: {
    id: 'about',
    title: 'About.exe',
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    width: 500,
    height: 450,
    defaultX: 80,
    defaultY: 60,
  },
  skills: {
    id: 'skills',
    title: 'Skills.txt',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 600,
    height: 500,
    defaultX: 120,
    defaultY: 100,
  },
  projects: {
    id: 'projects',
    title: 'Projects/',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 700,
    height: 550,
    defaultX: 160,
    defaultY: 140,
  },
  timeline: {
    id: 'timeline',
    title: 'Timeline.log',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 650,
    height: 500,
    defaultX: 200,
    defaultY: 80,
  },
  contact: {
    id: 'contact',
    title: 'Contact.sh',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 450,
    height: 350,
    defaultX: 240,
    defaultY: 200,
  },
  resume: {
    id: 'resume',
    title: 'Resume.pdf',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 600,
    height: 700,
    defaultX: 300,
    defaultY: 100,
  },
  paint: {
    id: 'paint',
    title: 'Paint.exe',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 600,
    height: 500,
    defaultX: 100,
    defaultY: 100,
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator.app',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 300,
    height: 400,
    defaultX: 400,
    defaultY: 150,
  },
  terminal: {
    id: 'terminal',
    title: 'Command Prompt',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 600,
    height: 400,
    defaultX: 150,
    defaultY: 200,
  },
  music: {
    id: 'music',
    title: 'Music Player',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 600,
    height: 600,
    defaultX: 200,
    defaultY: 50,
  },
  docs: {
    id: 'docs',
    title: 'Resume_Draft.docx',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 600,
    height: 700,
    defaultX: 100,
    defaultY: 80,
  },
  finder: {
    id: 'finder',
    title: 'KV_Finder',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 700,
    height: 500,
    defaultX: 50,
    defaultY: 50,
  },
  settings: {
    id: 'settings',
    title: 'System Settings',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 500,
    height: 450,
    defaultX: 150,
    defaultY: 150,
  },
  notes: {
    id: 'notes',
    title: 'Sticky Notes',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 300,
    height: 300,
    defaultX: 600,
    defaultY: 50,
  },
  monitor: {
    id: 'monitor',
    title: 'Activity Monitor',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 600,
    height: 400,
    defaultX: 100,
    defaultY: 300,
  },
  messenger: {
    id: 'messenger',
    title: 'KV_Messenger',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 400,
    height: 550,
    defaultX: 400,
    defaultY: 100,
  },
  calendar: {
    id: 'calendar',
    title: 'Calendar',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 500,
    height: 500,
    defaultX: 200,
    defaultY: 200,
  },
  game: {
    id: 'game',
    title: 'KV_Snake',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    width: 400,
    height: 450,
    defaultX: 300,
    defaultY: 150,
  },
};

export const useStore = create<OSStore>((set) => ({
  windows: initialWindows,
  highestZIndex: 10,
  isCommandPaletteOpen: false,
  isPoweredOff: false,
  isSleeping: false,
  isRestarting: false,
  isUpdating: false,
  theme: 'yellow',
  trashedApps: new Set(),

  openWindow: (id) =>
    set((state) => {
      const newZ = state.highestZIndex + 1;
      return {
        highestZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: newZ },
        },
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false },
      },
    })),

  toggleMinimize: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: !state.windows[id].isMinimized },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      const newZ = state.highestZIndex + 1;
      return {
        highestZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: newZ, isMinimized: false },
        },
      };
    }),

  toggleCommandPalette: () =>
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),

  setCommandPalette: (isOpen) =>
    set({ isCommandPaletteOpen: isOpen }),

  powerOff: () => {
    set({ isPoweredOff: true });
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  },

  sleep: () => {
    set({ isSleeping: true });
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  },

  restart: () => {
    set({ isRestarting: true });
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  },

  softwareUpdate: () => {
    set({ isUpdating: true });
    setTimeout(() => {
      window.location.reload();
    }, 8000); // 8 seconds for the update animation
  },

  setTheme: (theme) => set({ theme }),

  moveToTrash: (id) => set((state) => {
    const newTrash = new Set(state.trashedApps);
    newTrash.add(id);
    return { trashedApps: newTrash };
  }),

  restoreFromTrash: (id) => set((state) => {
    const newTrash = new Set(state.trashedApps);
    newTrash.delete(id);
    return { trashedApps: newTrash };
  }),
}));
