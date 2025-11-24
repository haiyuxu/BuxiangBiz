
import React, { useEffect, useState } from 'react';
import { View as ViewComp, Text as TextComp, Image as ImageComp } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Gift, Calendar, HeartPulse, MapPin, ArrowRight } from 'lucide-react';
import TopBar from '../../components/TopBar';
import BottomNav from '../../components/BottomNav';
import { api, UserProfile } from '../../services/api';
import './index.less';

const View = ViewComp as any;
const Text = TextComp as any;
const Image = ImageComp as any;

const Index: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await api.getUserProfile();
        setUserProfile(profile);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const navigateToTab = (url: string) => {
    Taro.redirectTo({ url });
  };

  return (
    <View className="container page-safe-area">
      <TopBar />
      
      {/* Banner */}
      <View className="banner">
        <View className="banner-content">
          <Text className="banner-title">
            {loading ? '欢迎回家...' : `欢迎回家，${userProfile?.name}`}
          </Text>
          <Text className="banner-subtitle">岳阳今日天气：多云 22°C</Text>
          <View 
            className="banner-btn"
            onClick={() => navigateToTab('/pages/assistant/index')}
          >
            <Text className="banner-btn-text">呼叫管家</Text>
            <ArrowRight size={14} color="#fff" />
          </View>
        </View>
        <View className="banner-bg-orb" />
      </View>

      {/* Grid */}
      <View className="grid-menu">
        <View className="grid-item" onClick={() => navigateToTab('/pages/shop/index')}>
          <View className="icon-wrap bg-orange"><Gift size={24} color="#ea580c" /></View>
          <Text className="grid-title">特产甄选</Text>
          <Text className="grid-desc">岳阳腊肉, 洞庭鱼干</Text>
        </View>

        <View className="grid-item" onClick={() => navigateToTab('/pages/clubhouse/index')}>
          <View className="icon-wrap bg-indigo"><Calendar size={24} color="#4f46e5" /></View>
          <Text className="grid-title">商务会所</Text>
          <Text className="grid-desc">会议预定, 私宴安排</Text>
        </View>

        <View className="grid-item" onClick={() => navigateToTab('/pages/assistant/index')}>
          <View className="icon-wrap bg-red"><HeartPulse size={24} color="#dc2626" /></View>
          <Text className="grid-title">陪诊医疗</Text>
          <Text className="grid-desc">老人陪诊, 就医协助</Text>
        </View>

        <View className="grid-item" onClick={() => navigateToTab('/pages/assistant/index')}>
          <View className="icon-wrap bg-sky"><MapPin size={24} color="#0284c7" /></View>
          <Text className="grid-title">回乡办事</Text>
          <Text className="grid-desc">专车接送, 政务协办</Text>
        </View>
      </View>

      {/* Featured */}
      <View className="featured-card card" onClick={() => navigateToTab('/pages/clubhouse/index')}>
        <Image src="https://picsum.photos/600/300" mode="aspectFill" className="featured-img" />
        <View className="featured-info">
          <View className="flex-row justify-between mb-2">
            <Text className="tag">本月推荐</Text>
            <Text className="text-muted text-xs">刚刚更新</Text>
          </View>
          <Text className="text-bold text-lg mb-2">“湘情”高端商务沙龙</Text>
          <Text className="text-muted text-sm mb-3">位于南湖之畔，私密性极佳，适合高端商务洽谈。</Text>
        </View>
      </View>

      <BottomNav current={0} />
    </View>
  );
};

export default Index;
