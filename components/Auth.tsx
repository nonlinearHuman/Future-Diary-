import React, { useState } from 'react';
import { User } from '../types';
import { CloudSun, ArrowRight, BookOpen } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (username.trim()) {
        onLogin({
          username: username,
          isAuthenticated: true
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white/80 w-full max-w-md p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white backdrop-blur-sm relative overflow-hidden">
        
        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-100 rounded-full blur-2xl opacity-60"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-2xl opacity-60"></div>

        <div className="relative text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-4 text-sky-500 transform rotate-3">
            <CloudSun size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-700 mb-2 tracking-wide">
            云边铺子
          </h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase eng-font">
            Cloudside Shop
          </p>
          <div className="mt-4 inline-block px-4 py-1 bg-sky-50 rounded-full text-xs text-sky-600 font-medium">
            {isLogin ? '欢迎光临' : '成为店员'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div className="space-y-1">
            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">
              {isLogin ? '您的昵称' : '取个名字'}
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-sky-200 focus:bg-white transition-all text-slate-700 placeholder-slate-300"
              placeholder="怎么称呼您？"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">
               通行证
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-sky-200 focus:bg-white transition-all text-slate-700 placeholder-slate-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-sky-600 text-white font-medium py-4 rounded-xl transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-sky-200 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span className="opacity-80">整理货架中...</span>
            ) : (
              <>
                {isLogin ? '进店休息' : '注册登记'} <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-400 text-sm hover:text-sky-600 transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <BookOpen size={14} />
            {isLogin ? '还没有档案？去登记' : '已有档案？去翻阅'}
          </button>
        </div>
      </div>
    </div>
  );
};