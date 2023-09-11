<template>
  <div class="grid p-5 bg-white gap-y-2">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold">用户列表</h3>
      <el-button type="primary" @click="handleNewData">新建用户</el-button>
    </div>

    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" label="选择" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="name" label="用户名" width="150" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="150" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150" />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button :type="scope.row.enable == 1 ? 'success' : 'danger'" plain size="small">
              {{ scope.row.enable == 1 ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ utcFormat(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ utcFormat(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" icon="Edit" link @click="handleEditClick(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" icon="Delete" link @click="handleDeleteClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>分页</div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import { utcFormat } from '@/utils/format';

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore();
systemStore.postUsersListAction();

// 2. 展示数据
const { usersList } = storeToRefs(systemStore);

function handleNewData() {
  console.log('新建用户');
}
function handleDeleteClick(id: number) {
  // systemStore.deleteUserDataAction(id);
  console.log('删除', id);
}

function handleEditClick(data: any) {
  // emit('editDataClick', data);
  console.log('编辑', data);
}
</script>

<style lang="less" scoped>
.table {
  :deep(.el-table__cell) {
    padding: 14px 0;
  }
}
</style>
