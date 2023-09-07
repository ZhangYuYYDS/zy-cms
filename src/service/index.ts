// service统一出口
import ZYRequest from './request/index';
import { BASE_URL, TIME_OUT } from './config/index';
import { localCache } from '@/utils/cache';

const zyRequest = new ZYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器:每一个请求都自动携带token
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache('token');
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
  },
});

export default zyRequest;
