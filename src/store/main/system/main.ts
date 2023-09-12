import { defineStore } from 'pinia';
import { getDepartmentData, getRoleData } from '@/service/main/system/system';

interface IMainState {
  entireDepartments: any[];
  entireRoles: any[];
}

export const useMainStore = defineStore('Main', {
  state: (): IMainState => ({
    entireDepartments: [],
    entireRoles: [],
  }),
  actions: {
    async fetchEntireDataAction() {
      // 请求部门列表数据
      const departmentResult = await getDepartmentData({ offset: 0, size: 100 });
      const roleResult = await getRoleData({ offset: 0, size: 100 });

      this.entireDepartments = departmentResult.data.list;
      this.entireRoles = roleResult.data.list;
    },
  },
});
