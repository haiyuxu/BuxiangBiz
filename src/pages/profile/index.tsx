
import React from 'react';
import { View as ViewComp, Text as TextComp, Image as ImageComp } from '@tarojs/components';
import { Settings, CreditCard, Package, Truck, ChevronRight } from 'lucide-react';
import BottomNav from '../../components/BottomNav';
import './index.less';

const View = ViewComp as any;
const Text = TextComp as any;
const Image = ImageComp as any;

const Profile: React.FC = () => {
  return (
    <View className="container page-safe-area">
      {/* Header */}
      <View className="header-card">
        <View className="user-row">
           <View className="avatar">
             <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="avatar-img" />
           </View>
           <View className="user-info">
             <Text className="user-name">李总</Text>
             <View className="vip-badge"><Text className="vip-text">Gold Member</Text></View>
             <Text className="user-phone">138 **** 8888</Text>
           </View>
           <Settings color="#fff" size={20} />
        </View>
        
        <View className="stats-row">
           <View className="stat-item">
             <Text className="stat-num text-amber">2,480</Text>
             <Text className="stat-lbl">余额</Text>
           </View>
           <View className="stat-item">
             <Text className="stat-num">12</Text>
             <Text className="stat-lbl">优惠券</Text>
           </View>
           <View className="stat-item">
             <Text className="stat-num">850</Text>
             <Text className="stat-lbl">积分</Text>
           </View>
        </View>
      </View>

      {/* Orders */}
      <View className="order-box card">
        <View className="flex-row justify-between mb-4 border-b">
           <Text className="text-bold">我的订单</Text>
           <View className="flex-row text-muted text-xs">
              <Text>查看全部</Text>
              <ChevronRight size={14} />
           </View>
        </View>
        <View className="icon-row">
           <View className="icon-col">
              <CreditCard size={24} color="#64748b" />
              <Text className="icon-lbl">待付款</Text>
           </View>
           <View className="icon-col">
              <Package size={24} color="#64748b" />
              <Text className="icon-lbl">待发货</Text>
           </View>
           <View className="icon-col">
              <Truck size={24} color="#64748b" />
              <Text className="icon-lbl">待收货</Text>
           </View>
        </View>
      </View>
      <BottomNav current={4} />
    </View>
  );
};

export default Profile;
