import { Play, SkipBack, SkipForward, Music2, ExternalLink, Headphones } from 'lucide-react';

const playlist = [
  { title: "Lofi Hip Hop Radio", artist: "Lofi Girl", type: "Lo-Fi", duration: "∞", link: "https://www.youtube.com/watch?v=jfKfPfyJRdk" },
  { title: "Midnight City", artist: "M83", type: "Synthwave", duration: "4:03", link: "https://open.spotify.com/track/16UnYpYvqyYvF78pQv6Iis" },
  { title: "Around the World", artist: "Daft Punk", type: "Electronic", duration: "7:09", link: "https://open.spotify.com/track/1pKYYY0d9pSNo7mCl6ZAn6" },
  { title: "Interstellar Main Theme", artist: "Hans Zimmer", type: "Epic", duration: "4:05", link: "https://open.spotify.com/track/1K6mD5v5XQ640R9HqXYvXb" },
  { title: "Coding Mode", artist: "Techno Beats", type: "Focus", duration: "1:20:00", link: "https://www.youtube.com/watch?v=5qap5aO4i9A" },
  { title: "Nightcall", artist: "Kavinsky", type: "Retro", duration: "4:18", link: "https://open.spotify.com/track/0U0WvS6ZSxc9vS6Z73j7vS" },
];

export default function MusicApp() {
  return (
    <div className="h-full bg-zinc-900 text-zinc-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Header / Now Playing area */}
      <div className="p-8 bg-gradient-to-b from-pink-900/40 to-zinc-900 border-b border-zinc-800 shrink-0">
        <div className="flex gap-8 items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-800 border-3 border-os-border shadow-brutal-md flex items-center justify-center relative group overflow-hidden">
            <Music2 size={64} className="text-zinc-600 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play size={48} className="text-white drop-shadow-md" />
            </div>
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-2 block">Current Playlist</span>
            <h1 className="text-3xl md:text-5xl font-black mb-2 leading-tight">CODING MODE</h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-md italic">
              "The perfect mix of lo-fi, synthwave, and deep focus tracks to keep the flow going."
            </p>
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-800 mb-2">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-6 md:col-span-7">Title</div>
          <div className="col-span-3 md:col-span-2 text-right">Genre</div>
          <div className="col-span-2 text-right invisible md:visible">Time</div>
        </div>

        {playlist.map((song, index) => (
          <a 
            key={index}
            href={song.link}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-12 gap-4 px-4 py-3 rounded-md hover:bg-zinc-800/50 transition-colors group items-center no-underline text-inherit"
          >
            <div className="col-span-1 text-center font-mono text-zinc-600 group-hover:text-pink-400">
              {index + 1}
            </div>
            <div className="col-span-6 md:col-span-7 flex flex-col">
              <span className="font-bold group-hover:text-pink-400 truncate">{song.title}</span>
              <span className="text-xs text-zinc-500 truncate">{song.artist}</span>
            </div>
            <div className="col-span-3 md:col-span-2 text-right">
              <span className="text-[10px] md:text-xs px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full font-bold group-hover:border-pink-500/50 transition-colors">
                {song.type}
              </span>
            </div>
            <div className="col-span-2 text-right font-mono text-zinc-500 invisible md:visible">
              {song.duration}
            </div>
          </a>
        ))}
      </div>

      {/* Footer / Controls */}
      <div className="h-20 bg-zinc-950 border-t border-zinc-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 w-1/3">
           <Headphones className="text-pink-500" size={20} />
           <div className="hidden sm:block">
             <div className="text-xs font-bold truncate">Immersive Flow</div>
             <div className="text-[10px] text-zinc-500">Spatial Audio Active</div>
           </div>
        </div>
        
        <div className="flex flex-col items-center gap-1 w-1/3">
          <div className="flex items-center gap-6">
            <SkipBack size={20} className="text-zinc-500 cursor-not-allowed" />
            <div className="w-10 h-10 bg-white text-zinc-950 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-brutal-sm">
              <Play size={20} fill="currentColor" />
            </div>
            <SkipForward size={20} className="text-zinc-500 cursor-not-allowed" />
          </div>
          <div className="w-full max-w-[200px] h-1 bg-zinc-800 rounded-full overflow-hidden mt-1 hidden sm:block">
            <div className="w-[35%] h-full bg-pink-500" />
          </div>
        </div>

        <div className="w-1/3 flex justify-end">
          <button className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors bg-zinc-800 px-3 py-1.5 border border-zinc-700 rounded-md">
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Spotify</span>
          </button>
        </div>
      </div>
    </div>
  );
}
