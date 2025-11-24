import React, { useState } from 'react';
import { RoomType } from '../types';
import { Users, Clock, Utensils, Sparkles, Check, X, ChevronRight, Info, Coffee, Monitor, Mic } from 'lucide-react';
import { generateMenuRecommendation } from '../services/geminiService';

const MENU_SETS = [
  {
    id: 'set-a',
    title: '岳阳名楼宴 (商务A餐)',
    price: '¥888 /位',
    desc: '经典湘菜，商务宴请首选。',
    dishes: ['洞庭湖大闸蟹', '红煨甲鱼', '清蒸翘嘴鱼', '樟树港辣椒炒肉', '君山银针鸡汤', '时令野菜', '长乐甜酒冲蛋'],
    tags: ['招牌', '微辣']
  },
  {
    id: 'set-b',
    title: '洞庭全鱼宴 (特色B餐)',
    price: '¥1288 /位',
    desc: '全鱼宴，尽享洞庭鲜美。',
    dishes: ['极品剁椒鱼头', '红烧回鱼', '干锅黄骨鱼', '鱼丸清汤', '香煎刁子鱼', '鱼杂火锅', '紫苏煎黄瓜'],
    tags: ['特色', '鲜美']
  },
  {
    id: 'set-c',
    title: '雅致养生宴 (清淡C餐)',
    price: '¥1688 /位',
    desc: '注重食材本味，健康养生。',
    dishes: ['松茸土鸡汤', '清蒸大黄鱼', '白灼罗氏虾', '上汤娃娃菜', '百合莲子羹', '五谷丰登', '精美果盘'],
    tags: ['养生', '不辣']
  }
];

const Clubhouse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'dining'>('rooms');
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menuPreferences, setMenuPreferences] = useState('');
  const [generatedMenu, setGeneratedMenu] = useState<string | null>(null);
  
  // Booking Modal State
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  
  // Menu Selection State
  const [selectedMenuSet, setSelectedMenuSet] = useState<any>(null);

  const handleGenerateMenu = async () => {
    if (!menuPreferences.trim()) return;
    setLoadingMenu(true);
    const menu = await generateMenuRecommendation(menuPreferences);
    setGeneratedMenu(menu);
    setLoadingMenu(false);
  };

  const handleBookRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSelectedRoom(null);
      setSelectedMenuSet(null);
      setShowBookingSuccess(true);
      setTimeout(() => setShowBookingSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="pb-24 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-56 bg-slate-900">
        <img 
          src="https://picsum.photos/800/400?grayscale" 
          alt="Clubhouse Interior" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-3xl font-serif font-bold mb-2">不象·商务会所</h2>
          <div className="flex items-center space-x-4 text-slate-300 text-sm">
             <span className="flex items-center"><Check size={14} className="mr-1 text-amber-500"/> 私密空间</span>
             <span className="flex items-center"><Check size={14} className="mr-1 text-amber-500"/> 高端定制</span>
             <span className="flex items-center"><Check size={14} className="mr-1 text-amber-500"/> 专人管家</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white sticky top-[60px] z-30 shadow-sm">
        <button
          onClick={() => setActiveTab('rooms')}
          className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'rooms' 
              ? 'border-amber-700 text-amber-700 bg-amber-50/50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          会议与沙龙
        </button>
        <button
          onClick={() => setActiveTab('dining')}
          className={`flex-1 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'dining' 
              ? 'border-amber-700 text-amber-700 bg-amber-50/50' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          私宴定制
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-w-lg mx-auto">
        {activeTab === 'rooms' ? (
          <div className="space-y-6 animate-in slide-in-from-left-4 fade-in">
            {[
              { type: RoomType.MEETING_SMALL, title: '静谧 · 小型会议室', cap: '6-8人', price: '¥200/小时', img: 'https://picsum.photos/400/200?random=10', tags: ['商务洽谈', '视频会议'] },
              { type: RoomType.SALON_LARGE, title: '云梦 · 多功能沙龙厅', cap: '20-30人', price: '¥800/小时', img: 'https://picsum.photos/400/200?random=11', tags: ['团建', '培训', '发布会'] },
              { type: RoomType.PRIVATE_DINING, title: '潇湘 · 贵宾茶室', cap: '4-6人', price: '¥300/小时', img: 'https://picsum.photos/400/200?random=12', tags: ['茶艺', '私密'] },
            ].map((room, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group">
                <div className="relative h-40 overflow-hidden">
                   <img src={room.img} alt={room.type} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   <div className="absolute top-2 right-2 flex space-x-1">
                      {room.tags.map(tag => (
                         <span key={tag} className="bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">{tag}</span>
                      ))}
                   </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-slate-800">{room.title}</h3>
                    <span className="text-amber-700 font-bold">{room.price}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 mb-5">
                    <span className="flex items-center"><Users size={14} className="mr-1 text-slate-400"/> {room.cap}</span>
                    <span className="flex items-center"><Clock size={14} className="mr-1 text-slate-400"/> 09:00 - 22:00</span>
                    <span className="flex items-center"><Coffee size={14} className="mr-1 text-slate-400"/> 免费茶水</span>
                  </div>
                  <button 
                    onClick={() => setSelectedRoom(room.title)}
                    className="w-full bg-white border border-slate-200 text-slate-800 py-3 rounded-xl text-sm font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                  >
                    预定此空间
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-right-4 fade-in">
            
            {/* 1. Set Menu Selection */}
            <div>
               <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-amber-700 rounded-full"></div>
                  <h3 className="text-lg font-bold text-slate-800">名厨定制套餐</h3>
               </div>
               <div className="grid grid-cols-1 gap-4">
                  {MENU_SETS.map((menu) => (
                     <div key={menu.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-2">
                              <div>
                                 <h4 className="font-bold text-slate-800 text-lg">{menu.title}</h4>
                                 <p className="text-xs text-slate-500 mt-1">{menu.desc}</p>
                              </div>
                              <div className="text-right">
                                 <div className="text-amber-700 font-bold text-lg">{menu.price}</div>
                                 <div className="flex space-x-1 justify-end mt-1">
                                    {menu.tags.map(tag => <span key={tag} className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">{tag}</span>)}
                                 </div>
                              </div>
                           </div>
                           <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                              <span className="text-xs text-slate-400">包含 {menu.dishes.length} 道精选菜品</span>
                              <button 
                                 onClick={() => setSelectedMenuSet(menu)}
                                 className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-colors"
                              >
                                 查看详情 & 预定
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* 2. AI Customization */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                  <h3 className="text-lg font-bold text-slate-800">AI 智能定制</h3>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100 shadow-sm">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">不仅仅是菜单，更是心意</h4>
                    <p className="text-xs text-slate-600 mt-1">告诉我们客人的口味偏好、忌口、籍贯，AI 将为您生成一份充满故事和文化的专属菜单。</p>
                  </div>
                </div>
                
                <textarea
                  value={menuPreferences}
                  onChange={(e) => setMenuPreferences(e.target.value)}
                  placeholder="例如：6人用餐，预算2000元，要微辣，必须有甲鱼，一位客人不吃香菜..."
                  className="w-full p-3 rounded-lg border border-purple-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px]"
                />
                
                <button
                  onClick={handleGenerateMenu}
                  disabled={loadingMenu || !menuPreferences}
                  className={`mt-3 w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all ${
                    loadingMenu || !menuPreferences 
                      ? 'bg-purple-100 text-purple-400 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200'
                  }`}
                >
                  {loadingMenu ? (
                    <><span>AI 正在思考搭配...</span></>
                  ) : (
                    <><Utensils size={16} /><span>生成定制菜单</span></>
                  )}
                </button>
              </div>

              {generatedMenu && (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-lg border border-slate-100 animate-fade-in relative">
                  <button onClick={() => setGeneratedMenu(null)} className="absolute top-2 right-2 p-2 text-slate-300 hover:text-slate-500"><X size={16}/></button>
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <h3 className="font-serif text-xl font-bold text-slate-800">AI 定制菜单建议</h3>
                  </div>
                  <div className="prose prose-sm prose-slate max-w-none font-serif leading-relaxed text-slate-600">
                    {generatedMenu.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => {
                          setShowBookingSuccess(true);
                          setTimeout(() => setShowBookingSuccess(false), 3000);
                      }}
                      className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center justify-center space-x-2"
                    >
                      <Check size={16} />
                      <span>采用此菜单并联系管家</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Booking Room Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
              <div>
                 <h3 className="text-xl font-bold text-slate-800">预定 · {selectedRoom}</h3>
                 <p className="text-xs text-slate-500 mt-1">请完善您的会议需求，以便我们提前布置</p>
              </div>
              <button onClick={() => setSelectedRoom(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleBookRoom} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">开始时间</label>
                    <input type="datetime-local" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">预计时长</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm">
                       <option>1 小时</option>
                       <option>2 小时</option>
                       <option>4 小时 (半天)</option>
                       <option>8 小时 (全天)</option>
                    </select>
                 </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">会议/活动主题</label>
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm mb-2">
                    <option>商务洽谈</option>
                    <option>内部培训</option>
                    <option>贵宾接待</option>
                    <option>项目路演</option>
                    <option>私人沙龙</option>
                 </select>
              </div>

              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-2">场地布置需求</label>
                 <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2 p-2 border border-slate-100 rounded-lg">
                       <input type="checkbox" className="rounded text-amber-600"/>
                       <span className="text-xs text-slate-600 flex items-center"><Monitor size={12} className="mr-1"/> 投影仪/LED</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 border border-slate-100 rounded-lg">
                       <input type="checkbox" className="rounded text-amber-600"/>
                       <span className="text-xs text-slate-600 flex items-center"><Mic size={12} className="mr-1"/> 音响麦克风</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 border border-slate-100 rounded-lg">
                       <input type="checkbox" className="rounded text-amber-600"/>
                       <span className="text-xs text-slate-600 flex items-center"><Coffee size={12} className="mr-1"/> 茶歇服务</span>
                    </label>
                    <label className="flex items-center space-x-2 p-2 border border-slate-100 rounded-lg">
                       <input type="checkbox" className="rounded text-amber-600"/>
                       <span className="text-xs text-slate-600">白板/书写板</span>
                    </label>
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">备注 (特殊需求)</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 h-20" placeholder="例如：需要准备鲜花，或者参会人员有重要领导..."></textarea>
              </div>

              <div className="pt-2">
                 <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
                    <Info size={12} />
                    <span>提交后，会所管家将在30分钟内联系您确认。</span>
                 </div>
                 <button type="submit" className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold hover:bg-amber-800 transition-colors shadow-lg shadow-amber-700/20">
                   提交预定申请
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Detail Modal */}
      {selectedMenuSet && (
         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
            <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden animate-in slide-in-from-bottom-10 max-h-[90vh] flex flex-col">
               <div className="relative h-48 bg-slate-200">
                  <img src={`https://picsum.photos/800/400?random=${selectedMenuSet.id}`} className="w-full h-full object-cover" />
                  <button onClick={() => setSelectedMenuSet(null)} className="absolute top-4 right-4 w-8 h-8 bg-black/30 backdrop-blur-md text-white rounded-full flex items-center justify-center">
                     <X size={16}/>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                     <h3 className="text-xl font-bold">{selectedMenuSet.title}</h3>
                     <p className="text-sm text-amber-400 font-bold">{selectedMenuSet.price}</p>
                  </div>
               </div>
               
               <div className="p-6 overflow-y-auto flex-1">
                  <div className="flex items-center space-x-2 mb-6">
                     {selectedMenuSet.tags.map((tag: string) => (
                        <span key={tag} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100">{tag}</span>
                     ))}
                  </div>
                  
                  <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">菜单详情</h4>
                  <div className="space-y-2 mb-6">
                     {selectedMenuSet.dishes.map((dish: string, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm text-slate-600 border-b border-slate-50 pb-2 last:border-0">
                           <span>{dish}</span>
                           <span className="text-slate-300 text-xs">0{idx + 1}</span>
                        </div>
                     ))}
                  </div>

                  <form onSubmit={handleBookRoom}>
                     <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">预定信息</h4>
                     <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 mb-1">用餐日期</label>
                           <input type="datetime-local" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"/>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 mb-1">用餐人数</label>
                           <input type="number" required placeholder="6" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"/>
                        </div>
                     </div>
                     <textarea placeholder="备注要求..." className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs h-16 mb-4"></textarea>
                     <button type="submit" className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold">
                        确认预定此套餐
                     </button>
                  </form>
               </div>
            </div>
         </div>
      )}

      {/* Success Toast */}
      {showBookingSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-xl flex items-center space-x-3 animate-in zoom-in-95">
            <Check size={24} className="text-green-400" />
            <div>
              <h4 className="font-bold">申请已提交</h4>
              <p className="text-xs text-slate-300">会所管家会尽快联系您确认档期。</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubhouse;