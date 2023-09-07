<template>
  <div class="flex items-center h-full gap-x-2">
    <!-- 折叠图标 -->
    <el-icon size="23px" @click="handleFoldClick">
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>

    <div class="flex items-center justify-between w-full">
      <!-- 1. 面包屑 -->
      <headerCrumb />
      <!-- 2. 用户信息 -->
      <headerInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import headerCrumb from './cpns/header-crumb.vue';
import headerInfo from './cpns/header-info.vue';

// 将这个事件发送给父组件
const emit = defineEmits(['foldChange']);

const isFold = ref(false);
function handleFoldClick() {
  isFold.value = !isFold.value;
  emit('foldChange', isFold.value);
}
</script>
