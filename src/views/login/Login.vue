<template>
  <div class="flex items-center justify-center w-full h-full login">
    <login-panel></login-panel>
  </div>
</template>

<script setup lang="ts">
import loginPanel from './cpns/login-panel.vue';
</script>

<style scoped lang="less">
.login {
  background: url('../../assets/img/login-bg.svg');
}
</style>
