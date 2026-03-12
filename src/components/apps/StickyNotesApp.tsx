import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  color: string;
}

const COLORS = [
  'bg-yellow-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-pink-200',
  'bg-purple-200',
];

export default function StickyNotesApp() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', text: 'Check out the new themes in Settings!', color: 'bg-yellow-200' },
    { id: '2', text: 'Build a snake game in React? Done.', color: 'bg-green-200' },
  ]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      text: '',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, text: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4 bg-os-bg-white overflow-auto brutal-scrollbar">
      <div className="flex justify-between items-center bg-os-window border-3 border-os-border p-2 shadow-brutal-sm">
        <h2 className="font-bold uppercase tracking-widest text-sm">Notes</h2>
        <button 
          onClick={addNote}
          className="p-1 border-2 border-os-border hover:bg-os-border hover:text-white transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className={`${note.color} border-3 border-os-border p-3 shadow-brutal-sm flex flex-col min-h-[150px] relative group`}
          >
            <textarea
              value={note.text}
              onChange={(e) => updateNote(note.id, e.target.value)}
              placeholder="Type something..."
              className="bg-transparent border-none focus:outline-none focus:ring-0 resize-none flex-1 font-mono text-xs text-os-border placeholder:text-os-border/30"
            />
            <button 
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 p-1 text-os-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-os-border"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
