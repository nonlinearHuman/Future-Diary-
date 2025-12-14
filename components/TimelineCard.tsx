import React from 'react';
import { DailyEntry } from '../types';
import { Book, PenTool, Cloud, Coffee, Mail } from 'lucide-react';

interface TimelineCardProps {
  title: string;
  subtitle: string;
  type: 'yesterday' | 'today' | 'tomorrow';
  entry?: DailyEntry | null;
  onQuestionSubmit?: (question: string) => void;
  isLoading?: boolean;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ 
  title, 
  subtitle, 
  type, 
  entry, 
  onQuestionSubmit,
  isLoading 
}) => {
  const [inputQuestion, setInputQuestion] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuestion.trim() && onQuestionSubmit) {
      onQuestionSubmit(inputQuestion);
    }
  };

  const getHeaderInfo = () => {
    switch (type) {
      case 'yesterday': 
        return { icon: <Mail className="text-indigo-400" size={20} />, label: "昨日回信" };
      case 'today': 
        return { icon: <PenTool className="text-sky-500" size={20} />, label: "今日日记" };
      case 'tomorrow': 
        return { icon: <Cloud className="text-slate-300" size={20} />, label: "云端未达" };
    }
  };

  const { icon, label } = getHeaderInfo();

  // Distinct styles for each card type
  const getContainerStyles = () => {
    switch (type) {
      case 'yesterday': 
        return 'bg-white border-dashed border-2 border-indigo-100 opacity-90 hover:opacity-100 rotate-1 md:-rotate-1';
      case 'today': 
        return 'bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 scale-100 md:scale-105 z-10';
      case 'tomorrow': 
        return 'bg-slate-50 border border-slate-100 opacity-70 -rotate-1 md:rotate-1';
    }
  };

  return (
    <div className={`
      relative flex flex-col h-full min-h-[420px] p-8 rounded-3xl transition-all duration-500
      ${getContainerStyles()}
    `}>
      {/* Tape Effect */}
      {type === 'today' && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-sky-100/50 rotate-[-2deg] backdrop-blur-sm shadow-sm rounded-sm"></div>
      )}

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
        <div>
          <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1 block eng-font">
            {subtitle}
          </span>
          <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
            {label}
          </h2>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl">
          {icon}
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        {type === 'yesterday' && (
          entry ? (
            <div className="space-y-6 animate-fadeIn h-full flex flex-col">
              <div className="bg-indigo-50/50 p-4 rounded-xl">
                <p className="text-sm text-indigo-900/60 leading-relaxed font-medium">
                  "{entry.question}"
                </p>
              </div>
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-slate-600 leading-7 text-[15px] text-justify">
                  {entry.answer}
                </p>
              </div>
              <div className="pt-4 text-right">
                 <span className="text-xs text-indigo-300 font-mono">{entry.date}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Book size={40} strokeWidth={1} className="mb-4 text-slate-200" />
              <p className="text-sm">昨日的日记本是空的。</p>
            </div>
          )
        )}

        {type === 'today' && (
          entry ? (
            <div className="space-y-6 animate-fadeIn h-full flex flex-col">
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-sky-50 text-sky-600 text-xs rounded-full mb-3">已收录</span>
                <h3 className="text-lg font-medium text-slate-800">"{entry.question}"</h3>
              </div>
              
              <div className="relative flex-grow bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] p-4 rounded-xl border border-slate-100">
                <div className="absolute -top-2 left-4 w-4 h-4 bg-red-100 rounded-full opacity-50"></div>
                <p className="text-slate-600 leading-8 relative z-10 handwritten text-lg">
                  {entry.answer}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <p className="text-slate-600 mb-2">欢迎来到云边铺子。</p>
                <p className="text-sm text-slate-400">用今天的烦恼或疑问，交换一份云端的来信。每天限一次哦。</p>
              </div>
              <form onSubmit={handleSubmit} className="flex-grow flex flex-col relative group">
                <textarea
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  placeholder="亲爱的店长，今天我想说..."
                  className="w-full flex-grow p-5 bg-slate-50 border-0 rounded-2xl focus:ring-0 focus:bg-sky-50/30 transition-all resize-none placeholder:text-slate-300 leading-relaxed"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputQuestion.trim()}
                  className="absolute bottom-4 right-4 bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-sky-600 disabled:bg-slate-200 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  {isLoading ? (
                    <Coffee size={16} className="animate-spin" />
                  ) : (
                    <PenTool size={16} />
                  )}
                  {isLoading ? '书写中...' : '投递'}
                </button>
              </form>
            </div>
          )
        )}

        {type === 'tomorrow' && (
          <div className="flex flex-col items-center justify-center text-slate-300 h-full">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
               <Cloud size={32} className="text-slate-300" />
            </div>
            <p className="text-center font-serif text-slate-400">
              明天的包裹<br/>还在路上
            </p>
          </div>
        )}
      </div>
    </div>
  );
};