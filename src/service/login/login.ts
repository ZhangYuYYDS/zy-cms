import zyRequest from '..';
import type { Account } from '@/types/login';

// 用户登录
export function accountLoginRequest(account: Account) {
  return zyRequest.post({
    url: '/login',
    data: account,
  });
}

// 查询某个用户
export function getUserById(id: number) {
  return zyRequest.get({
    url: '/user/' + id,
  });
}

// 查询某个菜单
export function getRoleMenus(id: number) {
  return zyRequest.get({
    url: '/menu/' + id,
  });
}
