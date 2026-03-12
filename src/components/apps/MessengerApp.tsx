import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

export default function MessengerApp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hey! Welcome to KV_Messenger. How's the OS experience so far?", sender: 'bot', time: '14:20' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Mock bot reply
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds awesome! I'm just a mock interface, but you can actually reach out to Koushil via the Contact app or LinkedIn!",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-os-bg-white overflow-hidden font-sans">
      <div className="bg-os-border text-white p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-os-bg-yellow flex items-center justify-center border-2 border-white">
          <Bot size={20} className="text-os-border" />
        </div>
        <div>
          <p className="font-bold text-xs uppercase tracking-widest leading-none">KV_Assistant</p>
          <span className="text-[8px] opacity-70 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Online
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto brutal-scrollbar flex flex-col gap-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col gap-1 max-w-[80%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
          >
            <div 
              className={`p-3 border-3 border-os-border shadow-brutal-sm font-medium text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-os-bg-yellow text-os-border' : 'bg-os-window text-os-border'}`}
            >
              {msg.text}
            </div>
            <span className="text-[8px] opacity-40 font-mono font-bold uppercase">{msg.time}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-os-window border-t-3 border-os-border flex gap-2 shadow-[0_-4px_0_0_#11111166]">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Write a message..."
          className="flex-1 bg-zinc-100 border-2 border-os-border px-3 py-2 font-mono text-xs focus:outline-none focus:bg-white transition-colors shadow-inner"
        />
        <button 
          onClick={handleSend}
          className="p-2 bg-os-bg-yellow border-2 border-os-border shadow-brutal-active active:translate-y-0.5 transition-transform"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
