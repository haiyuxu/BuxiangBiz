
import { request } from '../utils/request';

// 定义数据类型 (TypeScript 接口)
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
}

export interface UserProfile {
  name: string;
  level: string;
  phone: string;
  balance: number;
}

// 模拟真实 API 调用
// 在真实开发中，你需要让后端提供这些接口

export const api = {
  // 获取首页推荐产品
  getFeaturedProducts: () => {
    // 演示：这里暂时返回 Promise 模拟网络请求，以后替换为:
    // return request<Product[]>('/products/featured', 'GET');
    
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: '岳阳农家自制烟熏腊肉', price: 88, image: 'https://picsum.photos/400/400?random=1', desc: '传统柏树枝熏制' },
          { id: '2', name: '洞庭湖手撕刁子鱼', price: 45, image: 'https://picsum.photos/400/400?random=2', desc: '香辣酥脆' },
        ]);
      }, 500); // 模拟 500ms 网络延迟
    });
  },

  // 获取用户信息
  getUserProfile: () => {
    // return request<UserProfile>('/user/profile', 'GET');
    return Promise.resolve({
      name: '李总',
      level: 'Gold Member',
      phone: '138 **** 8888',
      balance: 2480
    });
  }
};
