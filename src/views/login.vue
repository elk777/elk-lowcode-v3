<!--
 * @Description: 登录页面
 * @Autor: lyf
 * @Date: 2025-06-19 14:14:50
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-25 10:49:04
 * @FilePath: /elk-lowcode-v3/src/views/login.vue
-->
<template>
  <div
    class="flex justify-center items-center h-screen w-full bg-gradient-to-br  p-0 m-0 overflow-hidden"
  >
    <div
      class="flex w-[85%] min-w-[1100px] max-w-[1500px] h-[75vh] min-h-[580px] max-h-[800px] rounded-2xl shadow-lg overflow-hidden relative"
    >
      <!-- 左侧内容区 -->
      <div
        class="flex-[1.3] bg-gradient-to-br from-[#4e73df] to-[#5e83e0] p-[50px] flex flex-col justify-center items-center text-center relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[url('../assets/logo.svg')] before:bg-no-repeat before:bg-center before:bg-[length:300px] before:opacity-5 before:z-0"
      >
        <h1 class="text-[42px] font-bold mb-6 relative z-1 drop-shadow-md">V3 Admin Lowcode</h1>
        <p class="text-16 opacity-90 mb-[50px] leading-[1.7] max-w-[550px] relative z-1">
          基于 Vue3、Vite4、TypeScript、Naive UI 的中后台解决方案
        </p>
        <div class="w-full flex justify-center mt-10 relative z-1">
          <img
            src="../assets/logo.svg"
            alt="Banner"
            class="w-200 h-200 animate-[float_6s_ease-in-out_infinite] brightness-105"
          />
        </div>
      </div>

      <!-- 右侧登录区 -->
      <div class="w-[460px] p-[60px_50px] flex flex-col justify-center">
        <div class="flex flex-col items-center mb-[45px]">
          <img src="../assets/logo.svg" alt="Logo" class="w-50 h-50 mb-4" />
          <h2 class="text-20 font-semibold text-[#333] m-0">V3 Admin</h2>
        </div>

        <n-form ref="formRef" :model="formData" :rules="rules" size="large">
          <n-form-item path="username" class="mb-6">
            <n-input v-model:value="formData.username" placeholder="请输入用户名" clearable>
              <template #prefix>
                <n-icon><UserOutlined /></n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="password" class="mb-6">
            <n-input
              v-model:value="formData.password"
              type="password"
              placeholder="请输入密码"
              show-password-on="click"
              :maxlength="20"
            >
              <template #prefix>
                <n-icon><LockOutlined /></n-icon>
              </template>
            </n-input>
          </n-form-item>

          <div class="flex justify-between items-center mb-6">
            <n-checkbox v-model:checked="formData.remember">记住我</n-checkbox>
            <n-button text class="text-[#4e73df] text-12.15">忘记密码？</n-button>
          </div>

          <div class="mb-4">
            <n-button type="primary" block @click="handleLogin" :loading="loading">
              登 录
            </n-button>
          </div>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import { NForm, NFormItem, NInput, NButton, NCheckbox, NIcon } from 'naive-ui'
import { UserOutlined, LockOutlined } from '@/libs/utils/icons'
import { useAuthStore } from '@/stores/auth'


// vue3中的inject
const $message = inject<MessageApiInjection>('$message')
console.log('🚀 ~ message:', $message)

// 定义表单数据接口
interface LoginFormData {
  username: string
  password: string
  remember: boolean
}

// 定义验证规则类型
type LoginFormRules = FormRules & {
  username: FormItemRule[]
  password: FormItemRule[]
}

// 定义组件名称
defineOptions({
  name: 'UserLoginPage',
})

const router = useRouter()
const loading = ref<boolean>(false)
const formRef = ref<FormInst | null>(null)

// 使用接口类型约束表单数据
const formData = reactive<LoginFormData>({
  username: 'admin',
  password: '123456',
  remember: false,
})

// 使用类型约束验证规则
const rules: LoginFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
  ],
}

/**
 * 处理登录逻辑
 * 验证表单并跳转到首页
 */
const handleLogin = async (): Promise<void> => {
  if (!formRef.value) return

  try {
    loading.value = true
    await formRef.value.validate()
    // 这里添加登录逻辑
    const authStore = useAuthStore()
    // 可以调用API接口进行身份验证
    const res = await authStore.Login(formData)
    if (res.code === 200) {
      $message.success('登录成功')
      router.push('/')
    }
  } catch (err: unknown) {
    console.error('登录验证失败:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Naive UI 组件样式覆盖 */
/* :deep(.n-input) {
  @apply rounded-lg;
}

:deep(.n-input__input) {
  @apply h-11 text-[15px];
}

:deep(.n-checkbox__label) {
  @apply text-sm;
} */

/* 响应式设计 */
/* @media (max-width: 1400px) {
  .login-box {
    @apply w-[90%] min-w-[1000px];
  }

  .banner-title {
    @apply text-4xl;
  }

  .login-card {
    @apply w-[430px] p-[50px_40px];
  }
} */
</style>



