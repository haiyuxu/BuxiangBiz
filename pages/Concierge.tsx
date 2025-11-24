import React, { useState } from 'react';
import { Car, FileText, Gift, Truck, HeartPulse, X, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  {
    id: 'medical',
    title: '陪诊服务',
    icon: <HeartPulse className="text-rose-500" size={24} />,
    desc: '专业陪诊师协助老人就医、取号、陪同检查，让您在外也放心。'
  },
  {
    id: 'gov',
    title: '政务协办',
    icon: <FileText className="text-blue-500" size={24} />,
    desc: '工商注册咨询、房产过户协助、证件代办等本地政务跑腿。'
  },
  {
    id: 'car',
    title: '专车接送',
    icon: <Car className="text-emerald-500" size={24} />,
    desc: '高铁站/机场 往返市区接送，商务车型，本地老司机。'
  },
  {
    id: 'errands',
    title: '同城跑腿',
    icon: <Truck className="text-orange-500" size={24} />,
    desc: '代取文件、代送礼品、紧急物品采购，使命必达。'
  },
  {
    id: 'gift',
    title: '节日慰问',
    icon: <Gift className="text-pink-500" size={24} />,
    desc: '代向家乡长辈送节礼、鲜花、慰问品，传递您的心意。'
  }
];

const Concierge: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [requestDetails, setRequestDetails] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setSelectedService(null);
      setRequestDetails('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="pb-24 min-h-screen bg-slate-50 p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">不象管家</h2>
        <p className="text-slate-500 text-sm">您的本地全能助手，让距离不是问题。</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {SERVICES.map((service) => (
          <div 
            key={service.id} 
            onClick={() => setSelectedService(service)}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="bg-slate-50 p-3 rounded-lg group-hover:bg-slate-100 transition-colors">
              {service.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 mb-1">{service.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
            </div>
            <button className="self-center px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-amber-700 hover:text-white transition-colors">
              预约
            </button>
          </div>
        ))}
      </div>

      {/* Manual Request Form */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-2">其他个性化需求</h3>
        <p className="text-xs text-slate-400 mb-4">任何本地需要协助的事项，都可以告诉我们</p>
        <textarea 
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 min-h-[100px]"
          placeholder="请描述您需要的服务..."
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
        ></textarea>
        <button 
          onClick={() => {
            if(requestDetails) handleSubmit({preventDefault:()=>{}} as any);
          }}
          disabled={!requestDetails}
          className="w-full mt-4 bg-slate-900 text-white py-3 rounded-lg font-medium text-sm hover:bg-slate-800 disabled:opacity-50"
        >
          提交需求
        </button>
      </div>

      {/* Service Request Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">预约{selectedService.title}</h3>
              <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">您的姓名</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" defaultValue="李总" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">联系电话</label>
                <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" placeholder="请输入联系电话" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">预约时间/备注</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 h-24" 
                  placeholder="例如：这周六上午9点，需要去中心医院..."
                ></textarea>
              </div>
              
              <button type="submit" className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold hover:bg-amber-800 transition-colors">
                确认预约
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
          <div className="bg-slate-900/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-xl flex items-center space-x-3 animate-in zoom-in-95">
            <CheckCircle2 className="text-green-400" size={24} />
            <div>
              <h4 className="font-bold">需求已提交</h4>
              <p className="text-xs text-slate-300">管家将在10分钟内致电与您确认。</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Concierge;