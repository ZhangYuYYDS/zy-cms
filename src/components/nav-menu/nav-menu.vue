<template>
  <div class="bg-[#001529] h-full w-full">
    <!-- logo -->
    <div class="flex flex-row items-center justify-center overflow-hidden h-7 p-y-2">
      <img class="h-full m-r-1" src="@/assets/img/logo.svg" alt="logo" />
      <span class="text-base font-bold text-white whitespace-nowrap" v-show="!isFold">后台管理系统</span>
    </div>

    <!-- 菜单 -->
    <el-menu :default-active="defaultValue" :collapse="isFold" text-color="#b7bdc3" active-text-color="#fff" background-color="#001529">
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('el-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
              {{ subitem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '@/store/login/login';
import { useRoute, useRouter } from 'vue-router';
import { mapPathToMenu } from '@/utils/map-menus';

// 接受数据
defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
});

// 获取菜单数据
const loginStore = useLoginStore();
const userMenus = loginStore.userMenus;

// main页面内容展示
const router = useRouter();
function handleItemClick(item: any) {
  router.push(item.url);
}

// 菜单默认值问题
const route = useRoute();
const currentMenu = mapPathToMenu(userMenus, route.path);
const defaultValue = ref(currentMenu.id + '');
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
