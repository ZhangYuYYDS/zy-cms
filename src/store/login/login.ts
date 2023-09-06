import { defineStore } from 'pinia';
import { accountLoginRequest } from '@/service/login/login';
import type { Account } from '@/types/login';
import { localCache } from '@/utils/cache';
import router from '@/router/index';

const LOGIN_TOKEN = 'login/token';

export const useLoginStore = defineStore('Login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
  }),
  getters: {},
  actions: {
    async loginAccountAction(account: Account) {
      // 1. 登录成功
      const loginResult = await accountLoginRequest(account);
      this.id = loginResult.data.id;
      this.name = loginResult.data.name;
      this.token = loginResult.data.token;

      // 2. 将token进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 3. 页面跳转（main页面）
      router.push('/main');
    },
  },
});
