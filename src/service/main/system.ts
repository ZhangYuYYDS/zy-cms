import zyRequest from '..';

/** 用户的网络请求 */
// 查询用户列表
export function getUserListData(queryInfo: any) {
  return zyRequest.post({
    url: '/users/list',
    data: queryInfo,
  });
}

// 新建某个用户
export function newUserData(userInfo: any) {
  return zyRequest.post({
    url: '/users',
    data: userInfo,
  });
}

// 删除某个用户
export function deleteUserData(id: number) {
  return zyRequest.delete({
    url: '/users/' + id,
  });
}

// 修改用户
export function editUserData(id: number, userInfo: any) {
  return zyRequest.patch({
    url: '/users/' + id,
    data: userInfo,
  });
}
