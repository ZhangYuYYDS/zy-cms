<template>
  <div class="grid p-5 bg-white gap-y-5">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold">用户列表</h3>
      <el-button type="primary" @click="handleNewData">新建用户</el-button>
    </div>
    <!-- 表格 -->
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
    <!-- 分页 -->
    <div class="flex justify-end">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="small"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import { utcFormat } from '@/utils/format';
import { ref } from 'vue';

const systemStore = useSystemStore();

// 页码相关逻辑开始
const small = ref(true);
const background = ref(true);
const currentPage = ref(1); //现在在第几页
const pageSize = ref(10); // 一页的数量
// 页码相关逻辑结束

// 发送网络请求：用于获取usersList, usersTotalCount数据
fetchUserListData();

// 2. 展示数据
const { usersList, usersTotalCount } = storeToRefs(systemStore);

function handleNewData() {
  console.log('新建');
}

function handleDeleteClick(id: number) {
  // systemStore.deleteUserDataAction(id);
  console.log('删除', id);
}

function handleEditClick(data: any) {
  // emit('editDataClick', data);
  console.log('编辑', data);
}

const handleSizeChange = () => {
  // 发送网络请求：用于根据size（页内数量）重新请求数据
  fetchUserListData();
};
const handleCurrentChange = () => {
  // 发送网络请求：用于根据offset（页码发生改变）重新请求数据
  fetchUserListData();
};

// 定义函数，用于发送网络请求
function fetchUserListData() {
  // 1. 获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const queryInfo = { size, offset };

  // 2. 发送网络请求，用于请求数据
  systemStore.postUsersListAction(queryInfo);
}
</script>

<style lang="less" scoped>
.table {
  :deep(.el-table__cell) {
    padding: 14px 0;
  }
}
</style>
