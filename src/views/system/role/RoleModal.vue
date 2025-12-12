<!--
 * @Author: elk
 * @Date: 2025-12-09 16:47:50
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-12 14:08:08
 * @FilePath: /elk-lowcode-v3/src/views/system/role/RoleModal.vue
 * @Description: 角色管理弹窗
-->
<template>
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
      ref="formRef"
      :model="formData"
      :rules="rules"
    >
      <n-grid>
        <n-grid-item span="12">
          <n-form-item label="角色名称" path="roleName">
            <n-input v-model:value="formData.roleName" placeholder="输入角色名称"></n-input>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="12">
          <n-form-item label="角色标识" path="roleKey">
            <n-input v-model:value="formData.roleKey" placeholder="输入角色编码"></n-input>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="12">
          <n-form-item label="角色排序" path="orderNum">
            <n-input-number
              class="w-100%"
              :min="0"
              v-model:value="formData.orderNum"
              placeholder="输入角色排序"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="12">
          <n-form-item label="角色状态" path="status">
            <n-radio-group v-model:value="formData.status">
              <n-radio label="1">正常</n-radio>
              <n-radio label="0">停用</n-radio>
            </n-radio-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="24">
          <n-form-item label="角色描述" path="remark">
            <n-input
              type="textarea"
              v-model:value="formData.remark"
              placeholder="输入角色描述"
            ></n-input>
          </n-form-item>
        </n-grid-item>
        <!-- 菜单权限 -->
        <n-grid-item span="24">
          <n-form-item label="菜单权限" path="menuIds">
            <n-tree
              class="w-100% h-200 overflow-auto"
              v-model:checked-keys="formData.menuIds"
              :data="menuTree"
              key-field="menuId"
              label-field="menuName"
              children-field="children"
              check-strategy="child"
              :render="(node) => node.title"
              :cascade="true"
              checkable
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-button @click="close">取消</n-button>
      <n-button type="primary" :loading="loading" @click="submit">确定</n-button>
    </template>
  </n-modal>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNavForm } from '@/hooks/common/userNavForm'
import { addRole, updateRole } from '@/apis/system/role'
import { getMenuList } from '@/apis/system/menu'
import { menuToTree } from '@/libs/utils/common'

import type { FormRules } from 'naive-ui'
import type { IRole } from '@/interfaces/system/role'
import type { IForm } from '@/interfaces/system/menu'

// 角色管理弹窗表单数据
const form = ref({
  roleName: '',
  roleKey: '',
  orderNum: 0,
  status: '1',
  remark: '',
  menuIds: [],
})
// 角色管理弹窗表单校验规则
const rules = ref<FormRules>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: ['blur'] }],
  roleKey: [{ required: true, message: '请输入角色标识', trigger: ['blur'] }],
  orderNum: [
    {
      required: true,
      message: '请输入角色排序',
      trigger: ['blur'],
      validator: (rule, value) => value !== null && value !== undefined && value !== '',
    },
  ],
})
// 角色管理弹窗菜单树数据
const menuTree = ref<IForm[]>([])

// 角色管理弹窗-hooks函数
const { show, title, formRef, formData, loading, submit, close, reset } = useNavForm<IRole>({
  formData: form.value,
  rules: rules.value,
  onSubmit: async (values) => {
    if (title.value === '新增角色') {
      await addRole(values)
    } else {
      await updateRole(values)
    }
  },
  onReset: () => {
    resetForm()
  },
})
/**
 * @description: 初始化菜单树
 * @return {*} 菜单树数据
 */
async function initMenuTree() {
  const res = await getMenuList()
  if (res.code === 200) {
    menuTree.value = menuToTree(res.data as IForm[]) || []
  }
}
/**
 * @description: 表单重置
 * @return {*} 重置后的表单数据
 */
const resetForm = () => {
  const defaultForm = {
    roleName: '',
    roleKey: '',
    orderNum: 0,
    status: '1',
    remark: '',
    menuIds: [],
  }
  form.value = { ...defaultForm }
}

// 生命周期 - onMounted
onMounted(() => {
  initMenuTree()
})

// 抛出私有属性和方法，供父组件调用
defineExpose({
  show,
  title,
  formData,
  reset
})
</script>
