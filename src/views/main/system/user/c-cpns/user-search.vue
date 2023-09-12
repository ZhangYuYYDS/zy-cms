<template>
  <div class="search">
    <el-form :inline="true" :model="userSearchForm" ref="formRef" size="large" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userSearchForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="userSearchForm.realname" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="userSearchForm.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="userSearchForm.enable" placeholder="请选择状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="userSearchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 重置和查询按钮-->
    <div class="text-right p-r-[50px] p-b-[10px]">
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ElForm } from 'element-plus';
import { reactive, ref } from 'vue';

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick']);

const userSearchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: '',
});

// 拿到form实例
const formRef = ref<InstanceType<typeof ElForm>>();
//重置
function handleResetClick() {
  formRef.value?.resetFields();
  // 发送自定义事件
  emit('resetClick');
}
// 查询
function handleQueryClick() {
  // 发送自定义事件
  emit('queryClick', userSearchForm);
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }
}
</style>
