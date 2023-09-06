<template>
  <div class="w-80">
    <h1 class="flex items-center justify-center mb-3">后台管理系统</h1>
    <!-- 登录框 -->
    <el-tabs type="border-card" stretch v-model="activeName">
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <!-- tab -->
        <template #label>
          <span class="flex items-center justify-center gap-x-1">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <!-- 内容 -->
        <panelAccount ref="accountRef" />
      </el-tab-pane>

      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span class="flex items-center justify-center gap-x-1">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <panelPhone />
      </el-tab-pane>
    </el-tabs>
    <!-- 记住密码/忘记密码-->
    <div class="flex items-center justify-between my-1">
      <el-checkbox v-model="isRem" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 立即登录按钮 -->
    <el-button type="primary" class="w-full text-xs" @click="handleLoginBtnClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import panelAccount from './panel-account.vue';
import panelPhone from './panel-phone.vue';
import { ref } from 'vue';

const activeName = ref('account');
const isRem = ref(false);
const accountRef = ref<InstanceType<typeof panelAccount>>();

function handleLoginBtnClick() {
  if (activeName.value == 'account') {
    // 获取子组件实例并执行实例中的方法+记住密码的功能（将isRem作为参数传递过去）
    accountRef.value?.loginAction(isRem.value);
  } else {
    console.log('phone');
  }
}
</script>

<style lang="less" scoped>
.el-icon {
  vertical-align: middle;
}
</style>
