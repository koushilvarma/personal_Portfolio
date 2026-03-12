import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const mockEvents: Record<number, string[]> = {
    12: ["Deploy KV_OS v2", "Meeting with Team"],
    15: ["Interview @ Google"],
    20: ["Hackathon Starts"],
    25: ["Vercel Deployment"],
  };

  return (
    <div className="p-6 h-full flex flex-col gap-6 bg-os-bg-white text-os-border">
      <div className="flex justify-between items-center bg-os-window border-3 border-os-border p-3 shadow-brutal-md">
        <button onClick={prevMonth} className="p-1 hover:bg-os-border hover:text-white border-2 border-transparent transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h2 className="font-bold text-xl uppercase tracking-widest">
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-1 hover:bg-os-border hover:text-white border-2 border-transparent transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center font-bold text-xs uppercase p-2 border-b-2 border-os-border">
            {d}
          </div>
        ))}
        
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2 border border-os-border/10 opacity-20" />
        ))}

        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1;
          const hasEvent = mockEvents[day];
          const isToday = new Date().getDate() === day && new Date().getMonth() === month;

          return (
            <div 
              key={day} 
              className={`p-2 border-2 border-os-border flex flex-col gap-1 min-h-[60px] relative transition-colors ${isToday ? 'bg-os-bg-yellow' : 'bg-os-window'} hover:bg-os-border hover:text-os-window group`}
            >
              <span className="font-bold text-sm">{day}</span>
              {hasEvent && (
                <div className="flex flex-col gap-1">
                  {hasEvent.map((e, idx) => (
                    <div key={idx} className="text-[8px] bg-os-border text-white px-1 leading-tight truncate px-1 rounded-sm">
                      {e}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
