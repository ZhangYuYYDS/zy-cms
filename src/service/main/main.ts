import zyRequest from '..';

/** 获取部门的信息 */
export function getDepartmentData(queryInfo: any) {
  return zyRequest.post({
    url: '/department/list',
    data: queryInfo,
  });
}

/** 获取角色的信息 */
export function getRoleData(queryInfo: any) {
  return zyRequest.post({
    url: '/role/list',
    data: queryInfo,
  });
}

/** 获取菜单的信息 */
export function getMenuData() {
  return zyRequest.post({
    url: '/menu/list',
  });
}
