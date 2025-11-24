import React from 'react';
import { AppView } from '../types';
import { ArrowRight, MapPin, Calendar, Gift, HeartPulse } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-amber-500 rounded-full opacity-20 blur-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">欢迎回家，李总</h2>
          <p className="text-slate-300 text-sm mb-4">岳阳今日天气：多云 22°C</p>
          <button 
            onClick={() => onChangeView(AppView.ASSISTANT)}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm transition-all"
          >
            <span>呼叫管家</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => onChangeView(AppView.SHOP)}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-32"
        >
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3">
            <Gift size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">特产甄选</h3>
            <p className="text-xs text-slate-500">岳阳腊肉, 洞庭鱼干</p>
          </div>
        </div>

        <div 
          onClick={() => onChangeView(AppView.CLUBHOUSE)}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-32"
        >
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">商务会所</h3>
            <p className="text-xs text-slate-500">会议预定, 私宴安排</p>
          </div>
        </div>

        <div 
          onClick={() => onChangeView(AppView.ASSISTANT)}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-32"
        >
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
            <HeartPulse size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">陪诊医疗</h3>
            <p className="text-xs text-slate-500">老人陪诊, 就医协助</p>
          </div>
        </div>

        <div 
          onClick={() => onChangeView(AppView.ASSISTANT)}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-32"
        >
          <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-3">
            <MapPin size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">回乡办事</h3>
            <p className="text-xs text-slate-500">专车接送, 政务协办</p>
          </div>
        </div>
      </div>

      {/* Featured Service */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <img src="https://picsum.photos/600/300" alt="Clubhouse" className="w-full h-40 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-amber-700 font-semibold text-xs uppercase tracking-wider">本月推荐</span>
            <span className="text-slate-400 text-xs">刚刚更新</span>
          </div>
          <h3 className="font-bold text-slate-800 text-lg mb-1">“湘情”高端商务沙龙</h3>
          <p className="text-slate-500 text-sm mb-3">位于南湖之畔，私密性极佳，适合高端商务洽谈。提供全套茶艺服务。</p>
          <button onClick={() => onChangeView(AppView.CLUBHOUSE)} className="text-amber-700 font-medium text-sm hover:underline">
            立即查看详情 &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;