<template>
  <div class="main">
    <h2>main</h2>
    <button @click="tuichu">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { localCache } from '@/utils/cache';

function tuichu() {
  localCache.deleteCache('token');

  router.push('/login');
}
</script>
