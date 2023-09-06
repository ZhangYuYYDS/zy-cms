// service统一出口
import ZYRequest from './request/index';
import { BASE_URL, TIME_OUT } from './config/index';
// import { LOGIN_TOKEN } from '@/global/constants'
// import { localCache } from '@/utils/cache'

const zyRequest = new ZYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器
  interceptors: {
    // 每一个请求都自动携带token
    // requestSuccessFn: (config) => {
    //   const token = localCache.getCache(LOGIN_TOKEN);
    //   if (config.headers && token) {
    //     config.headers.Authorization = 'Bearer ' + token;
    //   }
    //   return config;
    // },
  },
});

export default zyRequest;
