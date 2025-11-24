
import React from 'react';
import { View as ViewComp, Text as TextComp } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Home, ShoppingBag, Coffee, Briefcase, User } from 'lucide-react';
import './index.less';

const View = ViewComp as any;
const Text = TextComp as any;

interface Props {
  current: number;
}

const BottomNav: React.FC<Props> = ({ current }) => {
  const navItems = [
    { title: '首页', icon: Home, path: '/pages/index/index' },
    { title: '特产', icon: ShoppingBag, path: '/pages/shop/index' },
    { title: '会所', icon: Coffee, path: '/pages/clubhouse/index' },
    { title: '管家', icon: Briefcase, path: '/pages/assistant/index' },
    { title: '我的', icon: User, path: '/pages/profile/index' },
  ];

  const handleNav = (index: number, path: string) => {
    if (index === current) return;
    // 使用 redirectTo 避免层级叠加，模拟 Tab 切换体验
    Taro.redirectTo({ url: path });
  };

  return (
    <View className="bottom-nav">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = index === current;
        return (
          <View 
            key={index} 
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => handleNav(index, item.path)}
          >
            <Icon size={24} color={isActive ? '#b45309' : '#94a3b8'} strokeWidth={isActive ? 2.5 : 2} />
            <Text className="nav-text">{item.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default BottomNav;
