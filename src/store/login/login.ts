import { defineStore } from 'pinia';
import { accountLoginRequest, getUserById, getRoleMenus } from '@/service/login/login';
import type { Account } from '@/types/login';
import { localCache } from '@/utils/cache';
import router from '@/router/index';
import { mapMenuToRoutes } from '@/utils/map-menus';

// 指定state的类型
interface ILoginState {
  name: string;
  token: string;
  userInfo: any;
  userMenus: any[];
  // permissions: string[];
}

export const useLoginStore = defineStore('Login', {
  state: (): ILoginState => ({
    name: '', // 存name主要为了登录时展示信息哪里可以换名字
    token: localCache.getCache('token') ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? [],
  }),
  actions: {
    async loginAccountAction(account: Account) {
      // 1. 登录成功
      const loginResult = await accountLoginRequest(account);
      this.token = loginResult.data.token;
      this.name = loginResult.data.name;
      const id = loginResult.data.id;

      // 2. 将token进行本地缓存
      localCache.setCache('token', this.token);

      // 页面跳转前的操作一：RBAC
      // ①获取某个用户信息
      const userResult = await getUserById(id);
      const userInfo = userResult.data;
      this.userInfo = userInfo;
      localCache.setCache('userInfo', userInfo);
      const roleId = userResult.data.role.id;

      // ②根据role的id获取菜单
      const menuResult = await getRoleMenus(roleId);
      const userMenus = menuResult.data;
      this.userMenus = userMenus;
      localCache.setCache('userMenus', userMenus);

      // 页面跳转前的操作二：添加动态路由  => 抽取到utils/map-menus.ts中了
      const routes = mapMenuToRoutes(this.userMenus);
      routes.forEach((route) => router.addRoute('main', route));

      // 3. 页面跳转（main页面）
      router.push('/main');
    },
  },
});
