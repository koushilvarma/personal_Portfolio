import React, { useRef, useEffect, useState } from 'react';
import { Trash2, Download } from 'lucide-react';

export default function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight - 60; // Subtract toolbar height
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'sketch.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-white select-none overflow-hidden">
      {/* Toolbar */}
      <div className="h-14 border-b-3 border-os-border bg-gray-100 p-2 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 border-2 border-os-border cursor-pointer bg-white"
          />
          <div className="h-6 w-[2px] bg-gray-300 mx-1" />
          {[2, 5, 10, 20].map((w) => (
            <button
              key={w}
              onClick={() => setLineWidth(w)}
              className={`w-8 h-8 flex items-center justify-center border-2 border-os-border transition-all ${lineWidth === w ? 'bg-os-border text-white' : 'bg-white hover:bg-gray-200'}`}
            >
              <div style={{ width: w/2 + 2, height: w/2 + 2 }} className="bg-current rounded-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={clearCanvas}
            className="p-2 border-2 border-os-border bg-white hover:bg-red-100 transition-colors shadow-brutal-xs active:translate-y-0.5 active:shadow-none"
            title="Clear Canvas"
          >
            <Trash2 size={18} />
          </button>
          <button 
            onClick={downloadImage}
            className="p-2 border-2 border-os-border bg-white hover:bg-blue-100 transition-colors shadow-brutal-xs active:translate-y-0.5 active:shadow-none"
            title="Download Image"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative cursor-crosshair bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 touch-none"
        />
      </div>
    </div>
  );
}
