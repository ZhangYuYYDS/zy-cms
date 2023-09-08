import type { RouteRecordRaw } from 'vue-router';

/**
 * 映射菜单到路由
 * @param menus 菜单
 * @returns 路由
 */
export let firstMenu: any = null;
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
      if (route) {
        if (
          !routes.find((item) => {
            item.path == menu.url;
          })
        ) {
          routes.push({ path: menu.url, redirect: route.path });
        }
        routes.push(route);
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu;
    }
  }
  return routes;
}

/**
 * 根据我们的路径去匹配需要显示的菜单
 * @param userMenus 所有菜单
 * @param path 需要匹配的路径
 * @returns 匹配到的菜单
 */
export function mapPathToMenu(userMenus: any[], path: string) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) return submenu;
    }
  }
}

/**
 * 根据我们的路径去显示面包屑
 * @param userMenus 所有菜单
 * @param path 需要匹配的路径
 */
export function mapPathToBreadcrumbs(userMenus: any[], path: string) {
  const breadcrumbs: any[] = [];

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url == path) {
        breadcrumbs.push({ name: menu.name, path: menu.url });
        breadcrumbs.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return breadcrumbs;
}
