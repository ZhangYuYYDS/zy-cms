import { localCache } from '@/utils/cache';
import { firstMenu } from '@/utils/map-menus';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系：path=>component
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue'),
    },
  ],
});

// 动态添加路由

// 路由导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache('token');

  if (!token && to.path.startsWith('/main')) {
    return '/login';
  }

  if (token && to.path == '/login') {
    return '/main';
  }

  // 如果是到main页面，我们就跳转到第一个匹配到的路由
  if (firstMenu && to.path == '/main') {
    return firstMenu.url;
  }
});

export default router;
