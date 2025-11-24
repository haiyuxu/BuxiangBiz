
import Taro from '@tarojs/taro';

// 假设你的后端地址 (开发环境)
const BASE_URL = 'https://api.buxiang-business.com/api/v1';

// 拦截器：可以在这里处理 Token 注入
const customInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  
  // 从缓存获取 Token
  const token = Taro.getStorageSync('Authorization');
  if (token) {
    requestParams.header = {
      ...requestParams.header,
      Authorization: `Bearer ${token}`,
    };
  }

  return chain.proceed(requestParams).then((res) => {
    // 处理后端统一的错误码
    if (res.statusCode === 200) {
      return res.data;
    } else if (res.statusCode === 401) {
      // Token 过期，跳转登录
      Taro.navigateTo({ url: '/pages/login/index' });
      return Promise.reject(res);
    } else {
      Taro.showToast({ title: '服务异常', icon: 'none' });
      return Promise.reject(res);
    }
  });
};

Taro.addInterceptor(customInterceptor);

export const request = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<T> => {
  try {
    const result = await Taro.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
      },
    });
    return result as unknown as T;
  } catch (error) {
    Taro.showToast({ title: '网络连接失败', icon: 'none' });
    throw error;
  }
};
