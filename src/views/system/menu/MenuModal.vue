<!--
 * @Author: elk
 * @Date: 2025-11-25 15:44:19
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-12 14:08:24
 * @FilePath: /elk-lowcode-v3/src/views/system/menu/MenuModal.vue
 * @Description: 菜单表单弹框
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
      <n-form-item label="上级菜单">
        <n-cascader
          v-model:value="formData.menuId"
          :options="options"
          placeholder="选择上级菜单"
          @update:value="getCheckedData"
          :cascade="false"
        />
      </n-form-item>
      <n-form-item label="菜单类型" path="menuType">
        <n-radio-group v-model:value="formData.menuType">
          <n-radio v-for="song in songs" :key="song.value" :value="song.value">
            {{ song.label }}
          </n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item v-if="!showPageA" label="菜单图标" path="menuIcon">
        <IconSelector class="w-100%" v-model:icon="formData.menuIcon" @getIcon="getIcon" />
      </n-form-item>
      <n-grid>
        <n-grid-item span="12">
          <n-form-item label="菜单名称" path="menuName">
            <n-input v-model:value="formData.menuName" placeholder="输入菜单名称"></n-input>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="12">
          <n-form-item label="菜单排序" path="orderNum">
            <n-input-number
              class="w-100%"
              :min="0"
              v-model:value="formData.orderNum"
              placeholder="输入菜单排序"
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>
      <n-grid>
        <n-grid-item v-if="!showPageA" span="12">
          <n-form-item label="是否外链" path="isFrame">
            <n-radio-group v-model:value="formData.isFrame">
              <n-radio value="0">是</n-radio>
              <n-radio value="1">否</n-radio>
            </n-radio-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item v-if="!showPageA" span="12">
          <n-form-item label="路由地址" path="path">
            <n-input v-model:value="formData.path" placeholder="输入路由地址"></n-input>
          </n-form-item>
        </n-grid-item>
      </n-grid>
      <n-grid>
        <n-grid-item v-if="showPageC" span="12">
          <n-form-item label="组件路径" path="component">
            <n-input v-model:value="formData.component" placeholder="输入组件路径"></n-input>
          </n-form-item>
        </n-grid-item>
        <n-grid-item v-if="showPageC || showPageA" span="12">
          <n-form-item label="权限标识" path="perms">
            <n-input v-model:value="formData.perms" placeholder="输入权限标识"></n-input>
          </n-form-item>
        </n-grid-item>
      </n-grid>
      <n-grid>
        <n-grid-item v-if="!showPageA" span="12">
          <n-form-item label="显示状态" path="visible">
            <n-radio-group v-model:value="formData.visible">
              <n-radio value="0">显示</n-radio>
              <n-radio value="1">隐藏</n-radio>
            </n-radio-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item v-if="!showPageA" span="12">
          <n-form-item label="菜单状态" path="status">
            <n-radio-group v-model:value="formData.status">
              <n-radio value="1">使用</n-radio>
              <n-radio value="0">停用</n-radio>
            </n-radio-group>
          </n-form-item>
        </n-grid-item>
      </n-grid>
      <n-grid>
        <n-grid-item v-if="!showPageA" span="12">
          <n-form-item label="是否缓存" path="isCache">
            <n-radio-group v-model:value="formData.isCache">
              <n-radio value="0">是</n-radio>
              <n-radio value="1">否</n-radio>
            </n-radio-group>
          </n-form-item>
        </n-grid-item>
        <n-grid-item span="12"></n-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-button @click="close">取消</n-button>
      <n-button type="primary" :loading="loading" @click="submit">确定</n-button>
    </template>
  </n-modal>
</template>
<script setup lang="ts" name="MenuModal">
import { ref, defineExpose, inject, defineEmits, computed } from 'vue'
import type { FormRules } from 'naive-ui'
import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import type { IForm } from '@/interfaces/system/menu'
import IconSelector from '@/components/IconSelector/index.vue'

import { useNavForm } from '@/hooks/common/userNavForm'
import { addMenu as addMenuApi, updateMenu as updateMenuApi } from '@/apis/system/menu'

const emit = defineEmits(['getList'])
const $message = inject<MessageApiInjection>('$message')!
const form = ref<IForm>({})
const songs = ref([
  { label: '目录', value: 'M' },
  { label: '菜单', value: 'C' },
  { label: '按钮', value: 'A' },
])
const rules: FormRules = {
  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  orderNum: [
    {
      required: true,
      message: '请输入排序号',
      trigger: 'blur',
      validator: (rule, value) => {
        // 允许0作为有效值
        return value !== null && value !== undefined && value !== ''
      },
    },
  ],
  path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
}
const options = [
  {
    label: '系统管理',
    value: 1,
    children: [
      {
        label: '菜单管理',
        value: 100,
      },
      {
        label: '角色管理',
        value: 101,
      },
      {
        label: '用户管理',
        value: 102,
      },
      {
        label: '部门管理',
        value: 103,
      },
    ],
  },
]
const showPageC = computed(() => {
  return form.value.menuType === 'C'
})
const showPageA = computed(() => {
  return form.value.menuType === 'A'
})

// 表单hooks函数
const { formData, title, loading, show, formRef, submit, close, reset } = useNavForm({
  formData: form.value,
  rules,
  onSubmit: async (data) => {
    if (title.value === '新增菜单') {
      addMenuApi(data)
    } else if (title.value === '修改菜单') {
      updateMenuApi(data)
    }
  },
  onReset: () => {
    resetForm()
  },
})
/**
 * @description: 获取选中的级联数据
 * @return {*}
 */
const getCheckedData = (value: number) => {
  form.value.parentId = value
}
/**
 * @description: 重置form表单
 * @return {*}
 */
const resetForm = () => {
  const defaultForm = {
    menuId: null,
    parentId: 0,
    menuName: '',
    menuType: 'M',
    menuIcon: '',
    orderNum: 0,
    path: '',
    component: '',
    isFrame: '1',
    visible: '0',
    status: '1',
    isCache: '1',
  }
  form.value = { ...defaultForm }
}
/**
 * @description: 新增菜单
 * @return {*}
 */
const addMenu = async () => {
  try {
    form.value.menuId = null
    const res = await addMenuApi(form.value)
    if (res.code === 200) {
      $message.success('新增菜单成功')
      handleCancel()
      emit('getList')
    }
  } catch (error) {
    console.log(error)
  }
}
/**
 * @description: 修改菜单
 * @return {*}
 */
const updateMenu = async () => {
  try {
    const res = await updateMenuApi(form.value)
    if (res.code === 200) {
      $message.success('修改菜单成功')
      handleCancel()
      emit('getList')
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * @description: 获取选择图标
 * @param {*} iconParams
 * @return {*}
 */
const getIcon = (iconParams: string) => {
  form.value.menuIcon = iconParams
}
// 抛出私有属性和方法，供父组件调用
defineExpose({
  show,
  title,
  formData,
  reset,
})
</script>
