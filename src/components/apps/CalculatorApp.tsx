import { useState } from 'react';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+'
  ];

  return (
    <div className="h-full bg-gray-200 p-4 font-mono select-none">
      <div className="bg-white border-3 border-os-border p-4 mb-4 text-right shadow-inner min-h-[80px] flex flex-col justify-end">
        <div className="text-gray-500 text-xs mb-1 h-4">{equation}</div>
        <div className="text-3xl font-bold truncate">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === 'C') clear();
              else if (btn === '=') calculate();
              else if (['+', '-', '*', '/'].includes(btn)) handleOperator(btn);
              else handleNumber(btn);
            }}
            className={`
              h-12 border-3 border-os-border font-bold shadow-brutal-xs 
              active:translate-y-0.5 active:shadow-none transition-all
              ${btn === '=' ? 'bg-green-400' : btn === 'C' ? 'bg-red-400' : 'bg-white hover:bg-gray-100'}
              ${['+', '-', '*', '/'].includes(btn) ? 'bg-yellow-200' : ''}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
