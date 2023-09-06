import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ZYRequestConfig } from './type';

// 拦截器: 蒙版Loading/token/修改配置
class ZYRequest {
  instance: AxiosInstance;
  // request实例 => axios的实例
  constructor(config: ZYRequestConfig) {
    this.instance = axios.create(config);

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        console.log('请求成功');
        return config;
      },
      (err) => {
        console.log('请求失败');
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log('响应成功');
        return res.data;
      },
      (err) => {
        console.log('响应失败');
        return err;
      }
    );

    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(config.interceptors?.requestSuccessFn, config.interceptors?.requestFailureFn);
    this.instance.interceptors.response.use(config.interceptors?.responseSuccessFn, config.interceptors?.responseFailureFn);
  }
  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: ZYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: ZYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }
  post<T = any>(config: ZYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T = any>(config: ZYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: ZYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default ZYRequest;
