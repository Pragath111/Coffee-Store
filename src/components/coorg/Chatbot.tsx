import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import logo from "../../assets/logo.jpg";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot'|'user', text: string}[]>([
    { role: 'bot', text: 'Hi there! Welcome to Coorg Coffee Store. How can I help you today?' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: "Thanks for reaching out! Our virtual assistant is currently in learning mode. For urgent queries, please use our WhatsApp chat!" }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-50 p-4 rounded-full bg-espresso text-cream shadow-xl shadow-espresso/40 hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'}`}
        aria-label="Open Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <div
        className={`fixed bottom-8 left-8 z-50 w-[calc(100vw-4rem)] sm:w-96 h-[500px] max-h-[calc(100dvh-6rem)] glass-dark rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-left ${
          isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'
        }`}
      >
        <div className="shrink-0 bg-espresso p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Coorg Coffee Logo" className="w-9 h-9 rounded-full object-cover shadow-gold" />
            <div>
              <h3 className="text-cream font-semibold text-sm">Coffee Assistant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-cream/60 text-xs">Online</p>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-cream/60 hover:text-cream hover:bg-white/10 p-1.5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 p-4 overflow-y-auto flex flex-col gap-4 bg-black/20">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-gradient-gold text-espresso rounded-tr-sm' 
                  : 'glass border border-white/10 text-cream rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="shrink-0 p-3 bg-espresso border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm text-cream outline-none focus:border-gold/50 transition-colors placeholder:text-cream/40"
          />
          <button type="submit" disabled={!input.trim()} className="p-2.5 rounded-full bg-gradient-gold text-espresso hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shrink-0 shadow-gold">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
