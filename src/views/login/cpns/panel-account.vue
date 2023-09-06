<template>
  <el-form ref="formRef" :model="account" label-width="60px" :rules="accountRules" status-icon>
    <!-- 账号 -->
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { Account } from '@/types/login';

import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useLoginStore } from '@/store/login/login';
import { localCache } from '@/utils/cache';

// 定义内部数据
const account = reactive<Account>({
  name: '',
  password: '',
});

// 定义form的验证规则
const accountRules = reactive<FormRules<Account>>({
  name: [
    { required: true, message: '必须输入用户名~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20个字母或数字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '密码必须在3位以上', trigger: 'blur' },
  ],
});

// 定义登录逻辑
const formRef = ref<FormInstance>();
const loginStore = useLoginStore();
function loginAction(isRem: boolean) {
  // 账号密码是否通过验证
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户的账号密码
      const name = account.name;
      const password = account.password;
      // 发送网络请求（携带账号和密码）
      // 版本1：直接发送网络请求
      // accountLoginRequest({ name, password }).then((res) => {
      //   console.log(res);
      // });
      // 版本2：在store的actions中发送网络请求
      loginStore.loginAccountAction({ name, password });

      // 记住密码
      if (isRem) {
        localCache.setCache('name', name);
        localCache.setCache('password', password);
      } else {
        localCache.deleteCache('name');
        localCache.deleteCache('password');
      }
    } else {
      // 格式不正确，给用户一个消息提示
      ElMessage.error('请输入正确的格式！');
    }
  });
}

// 定义暴露的属性和方法
defineExpose({ loginAction });
</script>
@/types/index
