<template>
  <div class="grid overflow-hidden rounded-lg gap-y-5">
    <userSearch />
    <userContent />
  </div>
</template>

<script setup lang="ts">
import userSearch from '@/views/main/system/user/c-cpns/user-search.vue';
import userContent from '@/views/main/system/user/c-cpns/user-content.vue';
</script>

<style lang="less" scoped></style>
