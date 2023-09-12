import { defineStore } from 'pinia';
import { postUsersListData } from '@/service/main/system/system';

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
    async postUsersListAction(queryInfo: any) {
      // 请求用户列表数据
      const usersListResult = await postUsersListData(queryInfo);
      const { totalCount, list } = usersListResult.data;
      this.usersList = list;
      this.usersTotalCount = totalCount;
    },
  },
});
