/*
 * @Author: elk
 * @Date: 2025-12-10 15:19:37
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-11 15:49:46
 * @FilePath: /elk-lowcode-v3/src/hooks/common/userNavForm.ts
 * @Description: 通用表单-hooks
 */
import { ref } from 'vue'
import type { FormRules, FormInst } from 'naive-ui'

// 定义hooks参数接口
export interface UseNavFormOptions<T> {
  //  表单数据
  formData: T
  //  表单验证规则
  rules: FormRules
  //  提交函数
  onSubmit: (data: T) => Promise<void>
  //   表单重置函数
  onReset: () => void
}
/**
 * @description: 通用表单：表单数据管理、验证、提交、重置、表单状态管理
 * @param {UseNavFormOptions} options 表单配置选项
 * @return {*}
 */
export function useNavForm<T>(options: UseNavFormOptions<T>) {
  //  表单数据
  const formData = ref<T>(options.formData || ({} as T))
  //  表单验证规则
  const rules = ref<FormRules>(options.rules || {})
  //   表单加载状态
  const loading = ref<boolean>(false)
  //   表单错误信息
  const errors = ref<Record<string, string>>({})
  //   表单引用
  const formRef = ref<FormInst | null>()
  //   表单显示状态
  const show = ref<boolean>(false)
  //   表单标题
  const title = ref<string>('')

  /**
   * @description: 表单验证
   * @return {*}   验证是否通过
   */
  const validate = async () => {
    if (!formRef.value) {
      return false
    }
    const valid = await formRef.value.validate()
    if (!valid) {
      errors.value = valid
      return false
    }
    errors.value = {}
    return true
  }
  /**
   * @description: 表单提交
   * @return {*}
   */
  const submit = async (): Promise<boolean> => {
    try {
      loading.value = true
      const valid = await validate()
      if (!valid) {
        return false
      }
      //  调用提交函数
      if (options.onSubmit) {
        await options.onSubmit(formData.value)
      }
      return true
    } catch (error) {
      console.log('🚀 ~ 表单提交失败 ~ error:', error)
      return false
    } finally {
      loading.value = false
    }
  }
  /**
   * @description: 表单重置
   * @return {*}
   */
  const reset = () => {
    formData.value = { ...(options.formData || ({} as T)) }
    errors.value = {}
    if (options.onReset) {
      options.onReset()
    }
  }
  //   关闭表单
  const close = () => {
    reset()
    show.value = false
  }

  // 导出属性和方法
  return {
    show,
    title,
    formRef,
    formData,
    rules,
    errors,
    loading,
    close,
    validate,
    submit,
    reset,
  }
}
