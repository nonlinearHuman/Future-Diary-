import React, { useState, useEffect } from 'react';
import { Auth } from './components/Auth';
import { TimelineCard } from './components/TimelineCard';
import { User, DailyEntry } from './types';
import { generateWisdom } from './services/geminiService';
import { LogOut, CloudSun } from 'lucide-react';

const STORAGE_KEY_USER = 'zen_user';
const STORAGE_KEY_HISTORY = 'zen_history';

const getTodayString = () => new Date().toLocaleDateString('zh-CN');

const getYesterdayString = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toLocaleDateString('zh-CN');
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<Record<string, DailyEntry>>({});
  const [loading, setLoading] = useState(false);

  // Initialize App
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY_USER);
    const storedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  const handleQuestionSubmit = async (question: string) => {
    const today = getTodayString();
    
    // Safety check: already answered today?
    if (history[today]) return;

    setLoading(true);
    const answer = await generateWisdom(question);
    
    const newEntry: DailyEntry = {
      date: today,
      question,
      answer,
      timestamp: Date.now()
    };

    const newHistory = { ...history, [today]: newEntry };
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(newHistory));
    setLoading(false);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const todayStr = getTodayString();
  const yesterdayStr = getYesterdayString();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700 flex flex-col relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

      {/* Header / Nav */}
      <header className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-sm text-sky-500">
            <CloudSun size={24} />
          </div>
          <span className="font-bold text-lg tracking-wide text-slate-700">云边铺子</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-slate-600">{user.username}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">VIP Customer</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-xl hover:bg-white"
            title="离开店铺"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          
          {/* Yesterday */}
          <div className="order-2 md:order-1 h-full pt-4 md:pt-12">
            <TimelineCard 
              title="Yesterday" 
              subtitle="Yesterday" 
              type="yesterday" 
              entry={history[yesterdayStr]} 
            />
          </div>

          {/* Today */}
          <div className="order-1 md:order-2 h-full mb-6 md:mb-0">
            <TimelineCard 
              title="Today" 
              subtitle="Present" 
              type="today" 
              entry={history[todayStr]} 
              onQuestionSubmit={handleQuestionSubmit}
              isLoading={loading}
            />
          </div>

          {/* Tomorrow */}
          <div className="order-3 md:order-3 h-full pt-4 md:pt-12">
            <TimelineCard 
              title="Tomorrow" 
              subtitle="Mystery" 
              type="tomorrow" 
            />
          </div>
        </div>
      </main>

      {/* Footer Quote */}
      <footer className="relative z-10 py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
             <div className="w-2 h-2 rounded-full bg-slate-300 absolute top-4 left-4"></div>
             <div className="w-2 h-2 rounded-full bg-slate-300 absolute top-4 right-4"></div>
             
             <blockquote className="eng-font text-xl md:text-2xl text-slate-600 leading-normal italic">
              "Yesterday is history, tomorrow is a mystery. <br className="hidden md:block"/>
              But today is a gift. That is why it's called the <span className="text-sky-600 font-bold not-italic decoration-sky-300 underline underline-offset-4 decoration-2">present</span>."
            </blockquote>
          </div>
          <div className="mt-4 text-xs text-slate-400 tracking-widest uppercase">
            — Cloudside Shop Motto —
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;