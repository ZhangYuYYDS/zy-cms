<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbs" :key="item.name">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { mapPathToBreadcrumbs } from '@/utils/map-menus';
import { useRoute } from 'vue-router';
import { useLoginStore } from '@/store/login/login';
import { computed } from 'vue';

const breadcrumbs = computed(() => {
  const breadcrumbs = mapPathToBreadcrumbs(useLoginStore().userMenus, useRoute().path);
  return breadcrumbs;
});
</script>
