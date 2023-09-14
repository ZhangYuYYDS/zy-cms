import { deleteUserData, editUserData, getUserListData, newUserData } from '@/service/main/system';
import { defineStore } from 'pinia';

interface ISystemState {
  usersTotalCount: number;
  usersList: any[];
}
export const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersTotalCount: 0,
    usersList: [],
  }),
  actions: {
    // 请求用户列表数据
    async getUserListDataAction(queryInfo: any) {
      const userListResult = await getUserListData(queryInfo);
      const { list, totalCount } = userListResult.data;
      this.usersList = list;
      this.usersTotalCount = totalCount;
    },

    // 新建某个用户
    async newUserDataAction(userInfo: any) {
      await newUserData(userInfo);
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 删除某个用户
    async deleteUserDataAction(id: number) {
      await deleteUserData(id);
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 编辑某个用户
    async editUserDataAction(id: number, userInfo: any) {
      await editUserData(id, userInfo);
      this.getUserListDataAction({ offset: 0, size: 10 });
    },
  },
});
