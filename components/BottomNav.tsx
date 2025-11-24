import React from 'react';
import { Home, ShoppingBag, Coffee, Briefcase, User } from 'lucide-react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: AppView.HOME, icon: <Home size={22} />, label: '首页' },
    { view: AppView.SHOP, icon: <ShoppingBag size={22} />, label: '特产甄选' },
    { view: AppView.CLUBHOUSE, icon: <Coffee size={22} />, label: '会所' },
    { view: AppView.ASSISTANT, icon: <Briefcase size={22} />, label: '管家服务' },
    { view: AppView.PROFILE, icon: <User size={22} />, label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onChangeView(item.view)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${
              currentView === item.view ? 'text-amber-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`transition-transform duration-200 ${currentView === item.view ? 'scale-110' : ''}`}>
              {item.icon}
            </div>
            <span className={`text-[10px] ${currentView === item.view ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;