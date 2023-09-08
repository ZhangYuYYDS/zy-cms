import type { RouteRecordRaw } from 'vue-router';

/**
 * 映射菜单到路由
 * @param menus 菜单
 * @returns 路由
 */
export function mapMenuToRoutes(userMenus: any[]) {
  // 1. 获取菜单->userMenus
  // 2. 动态获取所有路由对象，放到数组中
  // * 路由对象都在独立的文件里/也可以直接都放到localRoutes中
  // * 从文件中将所有的路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = [];
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true });
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }

  // 3. 根据菜单去匹配正确的路由,将正确的路由都放到routes数组中
  const routes: RouteRecordRaw[] = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path == submenu.url);
      route && routes.push(route);
    }
  }
  return routes;
}
