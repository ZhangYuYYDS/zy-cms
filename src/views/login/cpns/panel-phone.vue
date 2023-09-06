<template>
  <el-form label-width="60px">
    <el-form-item label="手机号">
      <el-input />
    </el-form-item>
    <el-form-item label="验证码">
      <div class="flex gap-x-2">
        <el-input />
        <el-button type="primary">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped></style>
