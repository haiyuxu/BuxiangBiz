import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Car, FileText, Gift, Truck, HeartPulse, X, CheckCircle2, MessageSquareText, LayoutGrid, MapPin, Calendar, Briefcase, UserPlus } from 'lucide-react';
import { getGeminiChat } from '../services/geminiService';
import { ChatMessage } from '../types';

const SERVICES = [
  {
    id: 'medical',
    title: '陪诊服务',
    icon: <HeartPulse className="text-rose-500" size={24} />,
    desc: '专业陪诊师协助老人就医、取号、陪同检查，让您在外也放心。',
    tag: '热门'
  },
  {
    id: 'gov',
    title: '政务协办',
    icon: <FileText className="text-blue-500" size={24} />,
    desc: '工商注册咨询、房产过户协助、证件代办等本地政务跑腿。',
    tag: '专业'
  },
  {
    id: 'car',
    title: '专车接送',
    icon: <Car className="text-emerald-500" size={24} />,
    desc: '高铁站/机场 往返市区接送，商务车型，本地老司机。',
    tag: '准时'
  },
  {
    id: 'errands',
    title: '同城跑腿',
    icon: <Truck className="text-orange-500" size={24} />,
    desc: '代取文件、代送礼品、紧急物品采购，使命必达。',
    tag: '快捷'
  },
  {
    id: 'gift',
    title: '节日慰问',
    icon: <Gift className="text-pink-500" size={24} />,
    desc: '代向家乡长辈送节礼、鲜花、慰问品，传递您的心意。',
    tag: '贴心'
  }
];

const Assistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'chat'>('services');
  
  // --- Concierge/Service State ---
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showServiceSuccess, setShowServiceSuccess] = useState(false);
  
  // Dynamic Form State
  const [formData, setFormData] = useState<any>({});

  // --- Chat State ---
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: '李总您好！我是您的私人商务管家。无论是陪诊、办事，还是生活咨询，我都在这里随时为您待命。',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Chat Effects ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  // --- Handlers ---
  const handleServiceClick = (service: any) => {
    setFormData({}); // Reset form
    setSelectedService(service);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSelectedService(null);
      setFormData({});
      setShowServiceSuccess(true);
      setTimeout(() => setShowServiceSuccess(false), 3000);
    }, 500);
  };

  const handleSendChat = async () => {
    if (!input.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsChatLoading(true);

    try {
      const chat = getGeminiChat();
      const result = await chat.sendMessage({ message: userMsg.text });
      const text = result.text;
      
      if (text) {
        const modelMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: text,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, modelMsg]);
      }
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "抱歉，网络连接似乎有点问题，请稍后再试。",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // --- Render Dynamic Form ---
  const renderServiceForm = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">联系人</label>
            <input name="name" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" defaultValue="李总" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">联系电话</label>
            <input name="phone" type="tel" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="138..." />
          </div>
        </div>
      </>
    );

    switch (selectedService.id) {
      case 'medical':
        return (
          <div className="space-y-4">
             <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3 rounded-lg text-xs mb-2 flex items-start">
                <HeartPulse size={16} className="mr-2 flex-shrink-0 mt-0.5" />
                <span>我们将安排有护士经验的陪诊师全程陪同，包括取号、就诊、检查、取药。</span>
             </div>
             {commonFields}
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">就诊医院 (必填)</label>
                <select name="hospital" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                   <option value="">请选择医院</option>
                   <option>岳阳市一人民医院</option>
                   <option>岳阳市二人民医院</option>
                   <option>岳阳中医院</option>
                   <option>岳阳妇幼保健院</option>
                </select>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">预约日期</label>
                   <input name="date" type="date" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"/>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">就诊科室</label>
                   <input name="dept" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="如：心内科"/>
                </div>
             </div>
             <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-3">
                <div className="flex items-center space-x-2 mb-2">
                   <UserPlus size={16} className="text-slate-400"/>
                   <span className="text-xs font-bold text-slate-600">患者信息 (用于挂号)</span>
                </div>
                <input name="patient" onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm" placeholder="患者姓名"/>
                <input name="idCard" onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm" placeholder="身份证号 (可选，方便代挂号)"/>
                <div className="flex items-center space-x-2 mt-2">
                   <input type="checkbox" id="wheelchair" className="rounded text-amber-600 focus:ring-amber-500"/>
                   <label htmlFor="wheelchair" className="text-xs text-slate-600">需要轮椅服务</label>
                </div>
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">病情/特殊需求备注</label>
                <textarea name="note" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 h-20" placeholder="例如：老人腿脚不便，听力不好，需要耐心沟通..."></textarea>
             </div>
          </div>
        );
      case 'car':
        return (
          <div className="space-y-4">
             {commonFields}
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">用车时间</label>
                   <input name="date" type="datetime-local" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"/>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">车型要求</label>
                   <select name="carType" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                      <option>商务别克GL8 (7座)</option>
                      <option>豪华轿车 (5座)</option>
                      <option>中巴车 (19座)</option>
                   </select>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">乘车人数</label>
                    <input type="number" name="passengers" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm" placeholder="人数"/>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">行李数量</label>
                    <input type="number" name="luggage" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm" placeholder="件数"/>
                </div>
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">出发地</label>
                <div className="relative">
                   <MapPin className="absolute left-3 top-3 text-slate-400" size={16}/>
                   <input name="start" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="例如：三荷机场 T1到达层"/>
                </div>
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">目的地</label>
                <div className="relative">
                   <MapPin className="absolute left-3 top-3 text-slate-400" size={16}/>
                   <input name="end" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="例如：南湖宾馆"/>
                </div>
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">航班/车次号 (用于监控延误)</label>
                <input name="flight" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="例如：CZ3344 / G1012"/>
             </div>
          </div>
        );
      case 'gift':
         return (
          <div className="space-y-4">
             {commonFields}
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">收礼人姓名</label>
                <input name="receiver" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"/>
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">送达地址</label>
                <input name="address" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="岳阳市内详细地址"/>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">送达时间</label>
                    <input type="date" name="deliveryDate" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm"/>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">礼物预算</label>
                    <input name="budget" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm" placeholder="如：500-800元"/>
                </div>
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">礼物类型偏好</label>
                <input name="giftType" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="例如：鲜花、水果、营养品、烟酒..."/>
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">寄语卡片内容</label>
                <textarea name="message" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 h-20" placeholder="我们会为您手写贺卡，请填写内容..."></textarea>
             </div>
          </div>
         );
      case 'gov':
         return (
            <div className="space-y-4">
               {commonFields}
               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">办理事项类型</label>
                  <select name="govType" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm">
                      <option>工商注册/变更</option>
                      <option>房产过户/咨询</option>
                      <option>社保/公积金咨询</option>
                      <option>其他政务代办</option>
                  </select>
               </div>
               <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">相关主体名称 (公司/个人)</label>
                   <input name="entityName" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm" placeholder="例如：湖南xx科技有限公司"/>
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">具体需求描述</label>
                  <textarea name="note" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm h-24" placeholder="请详细描述需要办理的业务及目前遇到的问题..."></textarea>
               </div>
            </div>
         );
      default:
        return (
           <div className="space-y-4">
              {commonFields}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">需求详情</label>
                <textarea name="note" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 h-32" placeholder="请详细描述您的需求..."></textarea>
              </div>
           </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px-60px)] bg-slate-50">
      
      {/* Tab Switcher */}
      <div className="bg-white p-2 flex justify-center border-b border-slate-100 sticky top-0 z-10">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full max-w-xs">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'services' 
                ? 'bg-white text-amber-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutGrid size={16} />
            <span>服务菜单</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'chat' 
                ? 'bg-white text-amber-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <MessageSquareText size={16} />
            <span>AI 对话</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative">
        
        {/* --- VIEW 1: SERVICES LIST --- */}
        {activeTab === 'services' && (
          <div className="p-4 space-y-6 animate-in slide-in-from-left-4 fade-in duration-300 pb-20">
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start space-x-3">
              <div className="bg-amber-200 text-amber-800 p-2 rounded-lg">
                <UserIcon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">专属私人管家</h3>
                <p className="text-xs text-slate-600 mt-1">
                  李总，您好。我是您的专属管家小王。任何本地事务，您只需在这里下单，我将亲自为您办理。
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="font-bold text-slate-800 pl-1 border-l-4 border-amber-700">我的服务菜单</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {SERVICES.map((service) => (
                  <div 
                    key={service.id} 
                    onClick={() => handleServiceClick(service)}
                    className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="bg-slate-50 p-3 rounded-lg group-hover:bg-slate-100 transition-colors z-10">
                      {service.icon}
                    </div>
                    <div className="flex-1 z-10">
                      <div className="flex items-center mb-1">
                        <h3 className="font-bold text-slate-800 mr-2">{service.title}</h3>
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">{service.tag}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                    </div>
                    <button className="self-center px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium group-hover:bg-amber-700 group-hover:text-white transition-colors z-10">
                      预约
                    </button>
                    {/* Decorative bg */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Request Box */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center space-x-2 mb-3">
                 <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                    <Bot size={16}/>
                 </div>
                 <h3 className="font-bold text-slate-800">其他个性化需求</h3>
              </div>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 min-h-[80px]"
                placeholder="如果上方没有您需要的服务，请直接在这里告诉我们..."
                name="custom"
                onChange={handleInputChange}
              ></textarea>
              <button 
                onClick={() => {
                  if(formData.custom) {
                     setSelectedService({ id: 'custom', title: '个性化需求' });
                     handleServiceSubmit({preventDefault:()=>{}} as any);
                  }
                }}
                disabled={!formData.custom}
                className="w-full mt-3 bg-slate-900 text-white py-3 rounded-lg font-medium text-sm hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                提交需求
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW 2: AI CHAT --- */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full animate-in slide-in-from-right-4 fade-in duration-300">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-slate-800 text-white ml-2' : 'bg-amber-700 text-white mr-2'
                    }`}
                  >
                    {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-slate-800 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex items-start mr-auto max-w-[85%]">
                   <div className="w-8 h-8 rounded-full bg-amber-700 text-white mr-2 flex items-center justify-center flex-shrink-0">
                     <Bot size={16} />
                   </div>
                   <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                     <Loader2 className="animate-spin text-slate-400" size={20} />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-slate-200">
              <div className="flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="询问管家..."
                  className="flex-1 bg-transparent focus:outline-none text-sm text-slate-800"
                />
                <button
                  onClick={handleSendChat}
                  disabled={!input.trim() || isChatLoading}
                  className={`p-2 rounded-full transition-colors ${
                    !input.trim() || isChatLoading ? 'text-slate-400' : 'text-amber-700 hover:bg-slate-200'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      
      {/* Service Request Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-2 border-b border-slate-50">
              <div className="flex items-center space-x-2">
                 <div className="p-2 bg-amber-50 rounded-lg text-amber-700">{selectedService.icon}</div>
                 <h3 className="text-xl font-bold text-slate-800">预约{selectedService.title}</h3>
              </div>
              <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleServiceSubmit}>
              {renderServiceForm()}
              
              <button type="submit" className="w-full mt-6 bg-amber-700 text-white py-3 rounded-xl font-bold hover:bg-amber-800 transition-colors shadow-lg shadow-amber-700/20">
                确认提交申请
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-3">
                 提交后，管家将在10分钟内致电您确认细节。
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showServiceSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-xl flex items-center space-x-3 animate-in zoom-in-95">
            <CheckCircle2 className="text-green-400" size={24} />
            <div>
              <h4 className="font-bold">需求已提交</h4>
              <p className="text-xs text-slate-300">人工管家将尽快与您联系。</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;