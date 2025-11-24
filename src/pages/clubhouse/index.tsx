
import React, { useState } from 'react';
import { View as ViewComp, Text as TextComp, Image as ImageComp, Textarea as TextareaComp, Button as ButtonComp, Input as InputComp } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Sparkles, Users, Clock } from 'lucide-react';
import { generateMenuRecommendation } from '../../services/geminiService';
import BottomNav from '../../components/BottomNav';
import './index.less';

const View = ViewComp as any;
const Text = TextComp as any;
const Image = ImageComp as any;
const Textarea = TextareaComp as any;
const Button = ButtonComp as any;
const Input = InputComp as any;

const Clubhouse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'dining'>('rooms');
  const [menuPref, setMenuPref] = useState('');
  const [generatedMenu, setGeneratedMenu] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!menuPref) return;
    setLoading(true);
    const result = await generateMenuRecommendation(menuPref);
    setGeneratedMenu(result);
    setLoading(false);
  };

  return (
    <View className="page-container page-safe-area">
      <View className="hero">
        <Image src="https://picsum.photos/800/400?grayscale" mode="aspectFill" className="hero-bg" />
        <View className="hero-overlay" />
        <View className="hero-text">
          <Text className="hero-title">不象·商务会所</Text>
          <Text className="hero-subtitle">私密空间 · 高端定制</Text>
        </View>
      </View>

      <View className="tabs">
        <View className={`tab-item ${activeTab === 'rooms' ? 'active' : ''}`} onClick={() => setActiveTab('rooms')}>
          <Text>会议与沙龙</Text>
        </View>
        <View className={`tab-item ${activeTab === 'dining' ? 'active' : ''}`} onClick={() => setActiveTab('dining')}>
          <Text>私宴定制</Text>
        </View>
      </View>

      <View className="content">
        {activeTab === 'rooms' ? (
          <View>
            {[1, 2].map(i => (
              <View key={i} className="room-card card">
                <Image src={`https://picsum.photos/400/200?random=${i+10}`} mode="aspectFill" className="room-img" />
                <View className="room-info">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-bold text-lg">静谧 · 小型会议室</Text>
                    <Text className="text-price">¥200/h</Text>
                  </View>
                  <View className="flex-row text-muted text-xs mb-3">
                    <Users size={14} /> <Text className="ml-1 mr-3">6-8人</Text>
                    <Clock size={14} /> <Text className="ml-1">09:00 - 22:00</Text>
                  </View>
                  <Button className="btn-outline" onClick={() => Taro.showToast({ title: '预定申请已提交' })}>立即预定</Button>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="dining-section">
            <View className="ai-box">
              <View className="flex-row mb-2">
                <Sparkles size={18} color="#9333ea" />
                <Text className="ai-title ml-2">AI 智能菜单定制</Text>
              </View>
              <Textarea 
                className="ai-input" 
                placeholder="请输入客人口味偏好、忌口、人数预算..."
                value={menuPref}
                onInput={(e) => setMenuPref(e.detail.value)}
              />
              <Button 
                className={`ai-btn ${loading ? 'disabled' : ''}`} 
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? 'AI 正在思考...' : '生成定制菜单'}
              </Button>
            </View>

            {generatedMenu && (
              <View className="menu-result animate-fade-in card">
                <Text className="menu-title">推荐菜单</Text>
                <Text className="menu-text">{generatedMenu}</Text>
                <Button className="btn-primary mt-4" onClick={() => Taro.showToast({ title: '已通知管家备菜' })}>
                  采用此菜单
                </Button>
              </View>
            )}
          </View>
        )}
      </View>
      <BottomNav current={2} />
    </View>
  );
};

export default Clubhouse;
