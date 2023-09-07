import { defineStore } from 'pinia';
import { accountLoginRequest, getUserById, getRoleMenus } from '@/service/login/login';
import type { Account } from '@/types/login';
import { localCache } from '@/utils/cache';
import router from '@/router/index';

// 指定state的类型
interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any[];
  // permissions: string[];
}

export const useLoginStore = defineStore('Login', {
  state: (): ILoginState => ({
    token: localCache.getCache('token') ?? '',
    userInfo: {},
    userMenus: [],
  }),
  actions: {
    async loginAccountAction(account: Account) {
      // 1. 登录成功
      const loginResult = await accountLoginRequest(account);
      this.token = loginResult.data.token;
      const id = loginResult.data.id;

      // 2. 将token进行本地缓存
      localCache.setCache('token', this.token);

      // 页面跳转前的操作：RBAC
      // ①获取某个用户信息
      const userResult = await getUserById(id);
      this.userInfo = userResult.data;
      const roleId = userResult.data.role.id;

      // ②根据role的id获取菜单
      const menuResult = await getRoleMenus(roleId);
      this.userMenus = menuResult.data;

      // 3. 页面跳转（main页面）
      router.push('/main');
    },
  },
});
