<template>
  <div class="modal">
    <el-dialog v-model="dialogFormVisible" title="新建数据" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入登录密码" />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="deparmentId">
            <el-select v-model="formData.deparmentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useSystemStore } from '@/store/main/system/system';
import { useMainStore } from '@/store/main/system/main';
import { storeToRefs } from 'pinia';

// 弹窗是否显示
const dialogFormVisible = ref(false);

// 定义数据绑定
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: '',
});

const mainStore = useMainStore();
mainStore.fetchEntireDataAction();
const { entireDepartments, entireRoles } = storeToRefs(mainStore);

const systemStore = useSystemStore();
// 点击确定按钮
function handleConfirmClick() {
  // 1. 弹窗关闭
  dialogFormVisible.value = false;
  // 2.发送网络请求：新建用户
  systemStore.newUserAction(formData);
}

// 新建：控制弹窗是否显示
function setDialogVisible() {
  dialogFormVisible.value = true;
}

defineExpose({ setDialogVisible });
</script>

<style lang="less" scoped></style>
