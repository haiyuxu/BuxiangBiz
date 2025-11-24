import React from 'react';
import { Bell, User, Banana } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md border border-amber-500/20">
          <Banana size={18} className="text-amber-500 fill-amber-500" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-none">不象商务</h1>
          <span className="text-[10px] text-amber-600 font-medium tracking-wider uppercase">Business Elite</span>
        </div>
      </div>
      <div className="flex items-center space-x-3 text-slate-600">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;