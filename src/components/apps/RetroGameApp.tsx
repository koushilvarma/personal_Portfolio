import { useEffect, useRef, useState } from 'react';
import { Trophy, Play, RotateCcw } from 'lucide-react';

export default function RetroGameApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const GRID_SIZE = 20;
  const CELL_SIZE = 20;

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: -1 });

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (dir.y === 0) setDir({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (dir.y === 0) setDir({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (dir.x === 0) setDir({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (dir.x === 0) setDir({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [dir]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      const newHead = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        return;
      }

      // Self collision
      if (snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [snake, dir, gameStarted, gameOver]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 400, 400);

    // Grid lines
    ctx.strokeStyle = '#F0F0F0';
    for (let i = 0; i <= 400; i += CELL_SIZE) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 400); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(400, i); ctx.stroke();
    }

    // Snake
    ctx.fillStyle = '#111111';
    snake.forEach(s => {
      ctx.fillRect(s.x * CELL_SIZE + 2, s.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    });

    // Food
    ctx.fillStyle = '#F5E642';
    ctx.beginPath();
    ctx.arc(food.x * CELL_SIZE + CELL_SIZE/2, food.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2 - 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#111111';
    ctx.stroke();

  }, [snake, food]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDir({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="h-full flex flex-col bg-os-bg-white p-4 items-center gap-4 overflow-hidden font-mono">
      <div className="w-full flex justify-between items-center bg-os-window border-3 border-os-border p-2 shadow-brutal-sm">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-yellow-600" />
          <span className="font-bold text-sm tracking-tighter">SCORE: {score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm opacity-40">BEST: {highScore}</span>
        </div>
      </div>

      <div className="relative border-4 border-os-border shadow-brutal-md bg-white">
        <canvas ref={canvasRef} width={400} height={400} className="block" />
        
        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
            {gameOver && (
              <div className="mb-4">
                <p className="text-2xl font-black text-red-600 uppercase tracking-widest animate-bounce">Game Over</p>
                <p className="text-xs font-bold opacity-60 mt-1">SNAKE COLLISION DETECTED</p>
              </div>
            )}
            <button 
              onClick={startGame}
              className="group relative flex items-center gap-3 bg-os-bg-yellow border-3 border-os-border p-4 shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-active transition-all"
            >
              {gameOver ? <RotateCcw size={20} /> : <Play size={20} />}
              <span className="font-black text-lg uppercase tracking-widest">{gameOver ? 'Try Again' : 'Start Journey'}</span>
            </button>
            <p className="mt-6 text-[10px] font-bold opacity-40 uppercase tracking-widest">Use Arrow Keys to Navigate</p>
          </div>
        )}
      </div>
    </div>
  );
}
