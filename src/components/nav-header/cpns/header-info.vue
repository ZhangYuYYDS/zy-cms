<template>
  <div class="flex items-center justify-center gap-x-5">
    <div class="flex gap-x-2">
      <span class="hover:bg-gray-200 h-[35px] w-[40px] flex items-center justify-center">
        <el-icon size="20px"><Bell /></el-icon>
      </span>
      <span class="hover:bg-gray-200 h-[35px] w-[40px] flex items-center justify-center">
        <el-icon size="20px"><ChatDotRound /></el-icon>
      </span>

      <span class="hover:bg-gray-200 h-[35px] w-[40px] relative flex items-center justify-center">
        <span class="absolute z-10 w-[5px] h-[5px] bg-red-500 rounded-full -top-1 -right-1"></span>
        <el-icon size="20px"><Postcard /></el-icon>
      </span>
    </div>

    <div class="flex items-center justify-center info">
      <el-dropdown>
        <!-- 头像 -->
        <span class="flex items-center cursor-pointer gap-x-2">
          <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="" />
          <!-- 名字 -->
          <span>ZY</span>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleCloseFilled /></el-icon>
              退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { localCache } from '../../../utils/cache';

const router = useRouter();
function handleExitClick() {
  // 退出登录的操作
  // 1. 清空缓存
  localCache.deleteCache('token');
  localCache.deleteCache('userInfo');
  localCache.deleteCache('userMenus');
  // 2. 跳转到login页面
  router.push('/login');
}
</script>

<style scoped lang="less">
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
