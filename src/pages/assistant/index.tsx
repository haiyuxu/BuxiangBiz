
import React, { useState } from 'react';
import { View as ViewComp, Text as TextComp, ScrollView as ScrollViewComp, Input as InputComp } from '@tarojs/components';
import { Send, Bot, LayoutGrid, HeartPulse, Car } from 'lucide-react';
import { generateContent } from '../../services/geminiService';
import BottomNav from '../../components/BottomNav';
import './index.less';

const View = ViewComp as any;
const Text = TextComp as any;
const ScrollView = ScrollViewComp as any;
const Input = InputComp as any;

const Assistant: React.FC = () => {
  const [tab, setTab] = useState<'service' | 'chat'>('service');
  const [messages, setMessages] = useState<any[]>([
    { role: 'model', text: '李总您好！我是您的私人商务管家。' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const reply = await generateContent(userText);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: '网络开小差了' }]);
    }
    setLoading(false);
  };

  return (
    <View className="assistant-container page-safe-area">
      <View className="switch-bar">
        <View className={`switch-item ${tab === 'service' ? 'active' : ''}`} onClick={() => setTab('service')}>
          <LayoutGrid size={16} /> <Text className="ml-1">服务</Text>
        </View>
        <View className={`switch-item ${tab === 'chat' ? 'active' : ''}`} onClick={() => setTab('chat')}>
          <Bot size={16} /> <Text className="ml-1">对话</Text>
        </View>
      </View>

      {tab === 'service' ? (
        <ScrollView scrollY className="content-scroll">
          <View className="welcome-box">
             <Text className="text-bold">专属私人管家</Text>
             <Text className="text-xs text-slate-600 mt-2">李总，任何本地事务，您只需在这里下单，我将亲自为您办理。</Text>
          </View>

          <View className="service-grid">
            <View className="service-item card">
               <View className="icon-box red"><HeartPulse size={24} color="#f43f5e"/></View>
               <View>
                 <Text className="text-bold block">陪诊服务</Text>
                 <Text className="text-xs text-muted">专业护士陪同就医</Text>
               </View>
            </View>
            <View className="service-item card">
               <View className="icon-box green"><Car size={24} color="#10b981"/></View>
               <View>
                 <Text className="text-bold block">专车接送</Text>
                 <Text className="text-xs text-muted">商务车型 准时可靠</Text>
               </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="chat-layout">
          <ScrollView scrollY className="chat-area" scrollIntoView={`msg-${messages.length - 1}`}>
            {messages.map((msg, idx) => (
              <View key={idx} id={`msg-${idx}`} className={`msg-row ${msg.role === 'user' ? 'msg-right' : 'msg-left'}`}>
                 {msg.role === 'model' && <View className="avatar-bot"><Bot size={16} color="#fff"/></View>}
                 <View className={`bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
                    <Text>{msg.text}</Text>
                 </View>
              </View>
            ))}
            {loading && <Text className="loading-text">管家输入中...</Text>}
          </ScrollView>
          
          <View className="input-area">
             <Input 
               className="chat-input" 
               value={input} 
               onInput={(e) => setInput(e.detail.value)}
               placeholder="询问管家..." 
               confirmType="send"
               onConfirm={handleSend}
             />
             <View className="send-btn" onClick={handleSend}><Send size={20} color="#b45309" /></View>
          </View>
        </View>
      )}
      <BottomNav current={3} />
    </View>
  );
};

export default Assistant;
