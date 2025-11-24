
import React from 'react';
import { View as ViewComp, Text as TextComp } from '@tarojs/components';
import { Bell, User as UserIcon, Banana } from 'lucide-react';
import './index.less';

const View = ViewComp as any;
const Text = TextComp as any;

const TopBar: React.FC = () => {
  return (
    <View className="topbar">
      <View className="brand">
        <View className="logo-box">
          <Banana size={18} color="#f59e0b" />
        </View>
        <View className="brand-text">
          <Text className="app-name">不象商务</Text>
          <Text className="app-slogan">Business Elite</Text>
        </View>
      </View>
      <View className="actions">
        <View className="icon-btn">
          <Bell size={20} color="#475569" />
          <View className="badge" />
        </View>
        <View className="icon-btn">
          <UserIcon size={20} color="#475569" />
        </View>
      </View>
    </View>
  );
};

export default TopBar;
