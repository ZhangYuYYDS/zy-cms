<template>
  <div class="w-full h-full">
    <el-container class="w-full h-full">
      <!-- aside -->
      <el-aside class="aside" :width="isFold ? '60px' : '210px'">
        <navMenu :is-fold="isFold" />
      </el-aside>

      <el-container>
        <!-- header -->
        <el-header height="50px">
          <navHeader @foldChange="handleFoldChange" />
        </el-header>
        <!-- main -->
        <el-main class="bg-blue">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import navMenu from '../../components/nav-menu/nav-menu.vue';
import navHeader from '../../components/nav-header/nav-header.vue';

const isFold = ref(false);
function handleFoldChange(isFoldValue) {
  isFold.value = isFoldValue;
}
</script>

<style scoped lang="less">
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  background-color: #f0f2f5;
}
</style>
