import zyRequest from '@/service';

// 用户的网络请求
// 查询用户列表
export function postUsersListData(queryInfo: any) {
  return zyRequest.post({
    url: '/users/list',
    data: queryInfo,
  });
}

// 删除某个用户
export function deleteUserData(id: number) {
  return zyRequest.delete({
    url: '/users/' + id,
  });
}

// 新建某个用户
export function newUserData(userInfo: any) {
  return zyRequest.post({
    url: '/users',
    data: userInfo,
  });
}

// 获取部门信息
export function getDepartmentData(queryInfo: any) {
  return zyRequest.post({
    url: '/department/list',
    data: queryInfo,
  });
}

// 获取角色信息
export function getRoleData(queryInfo: any) {
  return zyRequest.post({
    url: '/role/list',
    data: queryInfo,
  });
}
