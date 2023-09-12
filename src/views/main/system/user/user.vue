<template>
  <div class="grid overflow-hidden rounded-lg gap-y-5">
    <userSearch @queryClick="queryClick" />
    <userContent ref="contentRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from '@/views/main/system/user/c-cpns/user-search.vue';
import userContent from '@/views/main/system/user/c-cpns/user-content.vue';
import { ref } from 'vue';

// 拿到userContent组件实例
const contentRef = ref<InstanceType<typeof userContent>>();
function queryClick(userSearchForm: any) {
  contentRef.value?.fetchUserListData(userSearchForm);
}
</script>

<style lang="less" scoped></style>
