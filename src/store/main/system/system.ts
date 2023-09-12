import { defineStore } from 'pinia';
import { postUsersListData, deleteUserData, newUserData } from '@/service/main/system/system';

interface ISystemState {
  usersList: any[];
  usersTotalCount: number;
}

export const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
  }),
  actions: {
    // 请求用户列表数据
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo);
      const { totalCount, list } = usersListResult.data;
      this.usersList = list;
      this.usersTotalCount = totalCount;
    },

    // 删除某个用户
    async deleteUserAction(id: number) {
      await deleteUserData(id);
      this.postUsersListAction({ offset: 0, size: 10 });
    },

    // 新建某个用户
    async newUserAction(userInfo: any) {
      await newUserData(userInfo);
      this.postUsersListAction({ offset: 0, size: 10 });
    },
  },
});
