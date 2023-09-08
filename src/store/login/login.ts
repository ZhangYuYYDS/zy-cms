import { defineStore } from 'pinia';
import { accountLoginRequest, getUserById, getRoleMenus } from '@/service/login/login';
import type { Account } from '@/types/login';
import { localCache } from '@/utils/cache';
import router from '@/router/index';
import { RouteRecordRaw } from 'vue-router';

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
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? [],
  }),
  actions: {
    async loginAccountAction(account: Account) {
      // 1. 登录成功
      const loginResult = await accountLoginRequest(account);
      this.token = loginResult.data.token;
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

      // 页面跳转前的操作二：添加动态路由

      // 1. 获取菜单->userMenus
      // 2. 动态获取所有路由对象，放到数组中
      // * 路由对象都在独立的文件里/也可以直接都放到localRoutes中
      // * 从文件中将所有的路由对象先读取数组中
      const localRoutes: RouteRecordRaw[] = [];
      const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', { eager: true });
      for (const key in files) {
        const module = files[key];
        localRoutes.push(module.default);
      }
      // 3. 根据菜单去匹配正确的路由
      for (const menu of userMenus) {
        for (const submenu of menu.chilren) {
          const route = localRoutes.find((item) => item.path == submenu.url);
          route && router.addRoute('main', route);
        }
      }

      // 3. 页面跳转（main页面）
      router.push('/main');
    },
  },
});
