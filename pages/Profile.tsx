import React, { useState } from 'react';
import { Settings, CreditCard, MapPin, Phone, ChevronRight, Package, Truck, Gift, Star, Clock, Calendar, ChevronLeft, Wallet, Receipt, LogOut } from 'lucide-react';
import { User } from 'lucide-react';

type ProfileView = 'MAIN' | 'ORDERS' | 'APPOINTMENTS' | 'ADDRESS' | 'WALLET' | 'COUPONS';

const MOCK_ORDERS = [
  { id: 'ORD-001', date: '2023-10-24', status: '运输中', items: [{ name: '岳阳农家自制烟熏腊肉', price: 88, count: 2, img: 'https://picsum.photos/200/200?random=1' }], total: 176 },
  { id: 'ORD-002', date: '2023-10-10', status: '已完成', items: [{ name: '君山银针礼盒 (特级)', price: 580, count: 1, img: 'https://picsum.photos/200/200?random=3' }], total: 580 },
  { id: 'ORD-003', date: '2023-09-28', status: '已完成', items: [{ name: '平江酱干组合装', price: 32, count: 5, img: 'https://picsum.photos/200/200?random=4' }], total: 160 },
];

const MOCK_APPOINTMENTS = [
  { id: 'APT-001', type: 'service', title: '政务协办 (工商变更)', date: '2023-10-25 09:00', status: '处理中', note: '管家正在整理材料' },
  { id: 'APT-002', type: 'room', title: '商务会所 (小型会议室)', date: '2023-10-28 14:00', status: '预定成功', note: '已预留投影仪' },
  { id: 'APT-003', type: 'service', title: '陪诊服务 (市一医院)', date: '2023-09-15 08:30', status: '已完成', note: '陪诊师：小张' },
];

const MOCK_ADDRESSES = [
  { id: 1, tag: '公司', address: '岳阳市岳阳楼区南湖大道888号 金融中心A座', contact: '李总 138****8888', isDefault: true },
  { id: 2, tag: '家', address: '岳阳市岳阳楼区洞庭湖畔景园 6栋606', contact: '李先生 138****8888', isDefault: false },
];

const Profile: React.FC = () => {
  const [view, setView] = useState<ProfileView>('MAIN');

  // --- Sub-View Components ---

  const Header = ({ title }: { title: string }) => (
    <div className="bg-white p-4 flex items-center sticky top-0 z-30 shadow-sm border-b border-slate-100">
      <button onClick={() => setView('MAIN')} className="mr-4 p-1 hover:bg-slate-100 rounded-full">
        <ChevronLeft size={24} className="text-slate-600" />
      </button>
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
  );

  const OrdersView = () => (
    <div className="bg-slate-50 min-h-screen animate-in slide-in-from-right">
      <Header title="我的订单" />
      <div className="p-4 space-y-4">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-3 border-b border-slate-50 pb-2">
              <span className="text-xs text-slate-500">订单号: {order.id}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                order.status === '运输中' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
              }`}>{order.status}</span>
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex space-x-3 mb-3">
                <img src={item.img} className="w-16 h-16 rounded-lg bg-slate-100 object-cover" />
                <div className="flex-1">
                   <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                   <div className="flex justify-between mt-2">
                      <span className="text-xs text-slate-500">x{item.count}</span>
                      <span className="text-sm font-medium text-slate-900">¥{item.price}</span>
                   </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 border-t border-slate-50">
               <span className="text-sm text-slate-500">合计: <span className="text-slate-900 font-bold">¥{order.total}</span></span>
               <div className="space-x-2">
                  <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600">查看物流</button>
                  <button className="px-3 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-medium">再次购买</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AppointmentsView = () => (
    <div className="bg-slate-50 min-h-screen animate-in slide-in-from-right">
      <Header title="我的预约 & 服务" />
      <div className="p-4 space-y-4">
        {MOCK_APPOINTMENTS.map(apt => (
          <div key={apt.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${apt.status === '已完成' ? 'bg-slate-300' : 'bg-amber-500'}`}></div>
            <div className="pl-3">
              <div className="flex justify-between items-start mb-2">
                 <div>
                    <h4 className="font-bold text-slate-800 text-sm">{apt.title}</h4>
                    <span className="text-[10px] text-slate-400">{apt.type === 'room' ? '会所预定' : '管家服务'}</span>
                 </div>
                 <span className={`text-xs px-2 py-0.5 rounded ${
                   apt.status === '处理中' ? 'bg-blue-50 text-blue-600' : 
                   apt.status === '预定成功' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                 }`}>{apt.status}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg text-xs text-slate-600 mb-2 space-y-1">
                 <div className="flex items-center"><Clock size={12} className="mr-2 text-slate-400"/> {apt.date}</div>
                 <div className="flex items-center"><Receipt size={12} className="mr-2 text-slate-400"/> {apt.note}</div>
              </div>
              {apt.status !== '已完成' && (
                 <div className="flex justify-end space-x-2">
                    <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600">联系管家</button>
                    <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-red-500 hover:bg-red-50">取消</button>
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AddressView = () => (
    <div className="bg-slate-50 min-h-screen animate-in slide-in-from-right">
      <Header title="地址管理" />
      <div className="p-4 space-y-4">
         {MOCK_ADDRESSES.map(addr => (
           <div key={addr.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                 <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-slate-800">{addr.contact.split(' ')[0]}</span>
                    <span className="text-slate-500 text-sm">{addr.contact.split(' ')[1]}</span>
                    {addr.isDefault && <span className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded">默认</span>}
                    <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded">{addr.tag}</span>
                 </div>
                 <p className="text-sm text-slate-600">{addr.address}</p>
              </div>
              <button className="p-2 text-slate-400 hover:text-amber-700"><Settings size={18}/></button>
           </div>
         ))}
         <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-sm font-medium hover:border-amber-500 hover:text-amber-600 transition-colors">
            + 新增地址
         </button>
      </div>
    </div>
  );

  // --- Main View ---
  if (view === 'MAIN') {
    return (
      <div className="min-h-screen bg-slate-50 pb-24">
        {/* Header Card */}
        <div className="bg-slate-900 text-white p-6 pt-10 rounded-b-[2rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10"></div>
          
          <div className="relative z-10 flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full border-2 border-amber-500 p-0.5">
               <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full" />
               </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold flex items-center">
                李总
                <span className="ml-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Gold Member</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1">138 **** 8888</p>
            </div>
            <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Settings size={20} />
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex justify-around text-center relative z-10">
            <div onClick={() => setView('WALLET')} className="cursor-pointer active:scale-95 transition-transform">
              <div className="text-2xl font-bold text-amber-500">2,480</div>
              <div className="text-xs text-slate-400">余额</div>
            </div>
            <div onClick={() => setView('COUPONS')} className="cursor-pointer active:scale-95 transition-transform">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-xs text-slate-400">优惠券</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">850</div>
              <div className="text-xs text-slate-400">积分</div>
            </div>
          </div>
        </div>

        <div className="p-4 -mt-6 relative z-20 space-y-4">
          
          {/* My Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-2">
              <h3 className="font-bold text-slate-800">我的订单</h3>
              <button onClick={() => setView('ORDERS')} className="text-xs text-slate-400 flex items-center">查看全部 <ChevronRight size={12}/></button>
            </div>
            <div className="flex justify-around mb-4">
              {[
                { label: '待付款', icon: <CreditCard size={24} /> },
                { label: '待发货', icon: <Package size={24} /> },
                { label: '待收货', icon: <Truck size={24} /> },
                { label: '评价', icon: <Star size={24} /> },
                { label: '售后', icon: <Phone size={24} /> },
              ].map((item, idx) => (
                <div key={idx} onClick={() => setView('ORDERS')} className="flex flex-col items-center space-y-2 text-slate-600 cursor-pointer hover:text-amber-700 transition-colors">
                  <div className="relative">
                    {item.icon}
                    {idx === 1 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
                  </div>
                  <span className="text-xs">{item.label}</span>
                </div>
              ))}
            </div>
            
            {/* Latest Order Preview */}
            <div onClick={() => setView('ORDERS')} className="bg-slate-50 p-3 rounded-lg flex space-x-3 items-center cursor-pointer">
              <img src="https://picsum.photos/400/400?random=1" className="w-12 h-12 rounded bg-slate-200 object-cover" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-slate-800">岳阳农家自制烟熏腊肉</span>
                  <span className="text-xs text-amber-600">运输中</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">预计明天送达</p>
              </div>
            </div>
          </div>

          {/* My Appointments / Services */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-2">
              <h3 className="font-bold text-slate-800">我的预约</h3>
              <button onClick={() => setView('APPOINTMENTS')} className="text-xs text-slate-400 flex items-center">全部记录 <ChevronRight size={12}/></button>
            </div>
            
            <div className="space-y-3">
               <div onClick={() => setView('APPOINTMENTS')} className="flex items-start space-x-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0 cursor-pointer">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                     <Clock size={18} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-slate-800">政务协办 (工商变更)</span>
                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">处理中</span>
                     </div>
                     <p className="text-xs text-slate-500 flex items-center mb-1">
                        <Calendar size={12} className="mr-1"/> 2023-10-25 09:00
                     </p>
                  </div>
               </div>

               <div onClick={() => setView('APPOINTMENTS')} className="flex items-start space-x-3 cursor-pointer">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                     <Calendar size={18} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-slate-800">商务会所 (小型会议室)</span>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">预定成功</span>
                     </div>
                     <p className="text-xs text-slate-500 flex items-center">
                        <Calendar size={12} className="mr-1"/> 2023-10-28 14:00 - 16:00
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
             <h3 className="font-bold text-slate-800 mb-4">常用工具</h3>
             <div className="grid grid-cols-4 gap-4">
                {[
                  { label: '地址管理', icon: <MapPin size={20}/>, action: () => setView('ADDRESS') },
                  { label: '我的钱包', icon: <Wallet size={20}/>, action: () => setView('WALLET') },
                  { label: '礼品卡', icon: <Gift size={20}/>, action: () => {} },
                  { label: '联系客服', icon: <Phone size={20}/>, action: () => {} },
                  { label: '发票助手', icon: <Receipt size={20}/>, action: () => {} },
                  { label: '设置', icon: <Settings size={20}/>, action: () => {} },
                  { label: '退出登录', icon: <LogOut size={20}/>, action: () => {} },
                ].map((tool, i) => (
                  <div key={i} onClick={tool.action} className="flex flex-col items-center space-y-2 cursor-pointer group">
                     <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                        {tool.icon}
                     </div>
                     <span className="text-xs text-slate-600">{tool.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Render sub-views based on state
  return (
    <>
      {view === 'ORDERS' && <OrdersView />}
      {view === 'APPOINTMENTS' && <AppointmentsView />}
      {view === 'ADDRESS' && <AddressView />}
      {(view === 'WALLET' || view === 'COUPONS') && (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
           <div className="text-center">
              <p className="text-slate-400 mb-4">功能开发中...</p>
              <button onClick={() => setView('MAIN')} className="text-amber-700">返回</button>
           </div>
        </div>
      )}
    </>
  );
};

export default Profile;