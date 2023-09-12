import zyRequest from '@/service';

// 用户的网络请求
export function postUsersListData(queryInfo: any) {
  return zyRequest.post({
    url: '/users/list',
    data: queryInfo,
  });
}
