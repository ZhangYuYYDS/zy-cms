import { localCache } from '@/utils/cache';
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
      component: () => import('../views/login/Login.vue'),
    },
    {
      path: '/main',
      component: () => import('../views/main/Main.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue'),
    },
  ],
});

// 路由导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache('token');
  if (token && to.path == '/login') {
    return '/main';
  }

  // if (!token && to.path.startsWith('/main')) {
  //   return '/login';
  // }

  // if (firstRoute && to.path == '/main') {
  //   return firstRoute.path;
  // }
});

export default router;
