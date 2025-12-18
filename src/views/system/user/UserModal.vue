<!--
 * @Author: elk
 * @Date: 2025-12-17 14:22:20
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-18 14:49:40
 * @FilePath: /elk-lowcode-v3/src/views/system/user/UserModal.vue
 * @Description: 用户管理弹窗
-->
<template>
  <div>
    <n-modal
      draggable
      preset="dialog"
      v-model:show="show"
      :title="title"
      :show-icon="false"
      :style="{ width: '850px' }"
    >
      <n-form
        label-width="auto"
        label-placement="left"
        label-align="left"
        require-mark-placement="right"
        :ref="formRef"
        :model="formData"
        :rules="rules"
      >
        <n-grid>
          <n-grid-item span="12">
            <n-form-item label="用户名称" path="userName">
              <n-input v-model:value="formData.userName" placeholder="输入用户名称"></n-input>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12">
            <n-form-item label="用户昵称" path="nickName">
              <n-input v-model:value="formData.nickName" placeholder="输入用户昵称"></n-input>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12">
            <n-form-item label="关联角色" path="roles">
              <n-select
                v-model:value="formData.roles"
                multiple
                filterable
                :options="roleOptions"
                placeholder="请选择关联角色"
              ></n-select>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12">
            <n-form-item label="手机号" path="phone">
              <n-input v-model:value="formData.phone" placeholder="输入手机号"></n-input>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12">
            <n-form-item label="邮箱" path="email">
              <n-input v-model:value="formData.email" placeholder="输入邮箱"></n-input>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12">
            <n-form-item label="性别" path="sex">
              <n-radio-group v-model:value="formData.sex">
                <n-radio value="1">男</n-radio>
                <n-radio value="0">女</n-radio>
              </n-radio-group>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12">
            <n-form-item label="密码" path="password">
              <n-input
                type="password"
                show-password-on="mousedown"
                v-model:value="formData.password"
                placeholder="输入密码"
              ></n-input>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12">
            <n-form-item label="用户状态" path="status">
              <n-radio-group v-model:value="formData.status">
                <n-radio value="1">正常</n-radio>
                <n-radio value="0">停用</n-radio>
              </n-radio-group>
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="24">
            <n-form-item label="用户描述" path="remark">
              <n-input
                type="textarea"
                v-model:value="formData.remark"
                placeholder="输入用户描述"
              ></n-input>
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
      <template #action>
        <n-button @click="close">取消</n-button>
        <n-button type="primary" :loading="loading" @click="submit">确定</n-button>
      </template>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useNavForm } from '@/hooks/common/userNavForm'
import { addUser, updateUser } from '@/apis/system/user'

import type { FormRules } from 'naive-ui'
import type { IUser } from '@/interfaces/system/user'

// 用户管理弹窗表单数据
const form = ref({
  userId: null,
  userName: null,
  nickName: null,
  roles: [],
  roleIds: null,
  phone: null,
  email: null,
  sex: '1',
  password: '123456',
  status: '1',
  remark: null,
})
// 用户管理弹窗表单校验规则
const rules = ref<FormRules>({
  userName: [{ required: true, message: '请输入用户名称', trigger: ['blur'] }],
  nickName: [{ required: true, message: '请输入用户昵称', trigger: ['blur'] }],
  roles: [{ required: true, message: '请选择关联角色', trigger: ['change'] }],
  //   手机号和邮箱进行格式验证，自定义规则
  phone: [
    {
      required: false,
      validator: (rule, value, callback) => {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      },
      trigger: ['blur'],
    },
  ],
  email: [
    {
      required: false,
      validator: (rule, value, callback) => {
        if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      },
      trigger: ['blur'],
    },
  ],
})
const roleOptions = ref([])
const { show, title, formRef, formData, loading, submit, close, reset } = useNavForm<IUser>({
  formData: form.value,
  rules: rules.value,
  onSubmit: async (values) => {
    if (title.value === '新增用户') {
      await addUser(values)
    } else {
      await updateUser(values)
    }
  },
  onReset: () => {
    resetForm()
  },
})
/**
 * @description: 重置form表单
 * @return {*}
 */
const resetForm = () => {
  const defaultForm = {
    userId: null,
    userName: null,
    nickName: null,
    roles: [],
    roleIds: null,
    phone: null,
    email: null,
    sex: '1',
    password: '123456',
    status: '1',
    remark: null,
  }
  form.value = defaultForm
}
// 抛出私有属性和方法，供父组件调用
defineExpose({
  show,
  title,
  formData,
  reset,
})
</script>
