import zyRequest from '..';
import type { Account } from '@/types/login';

export function accountLoginRequest(account: Account) {
  return zyRequest.post({
    url: '/login',
    data: account,
  });
}
