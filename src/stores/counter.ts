/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-06-25 15:35:01
 * @FilePath: \v3-admin-lowcode\src\stores\counter.ts
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Setup API 写法
export const useCounterStore = defineStore('counter', () => {
  // 定义状态 - vuex 的 state
  const count = ref<number>(0)
  // 定义计算属性 - vuex 的 getters
  const doubleCount = computed(() => count.value * 2)
  // 定义方法 - vuex 的 mutations
  function increment() {
    count.value++
  }

  // 组合式API 需要手动重置状态
  function $reset() {
    count.value = 0
  }

  return { count, doubleCount, increment, $reset }
})

// Options API 写法
export const useCounterStore2 = defineStore('counter2', {
  state: () => ({
    count: 0,
    name: 'counter2',
    isShow: false,
    isArr: [1, 2, 3],
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

// Options API 写法 + TS类型定义
interface IUserInfo {
  name: string
  age: number
}
interface IState {
  userInfo: IUserInfo[]
  user: IUserInfo | null
}

export const useCounterStore3 = defineStore('counter3', {
  state: (): IState => {
    return {
      userInfo: [],
      user: null,
    }
  },
})

const store3 = useCounterStore3()

store3.user = { name: 'elk', age: 18 }
store3.userInfo = [{ name: 'elk', age: 18 }]

// store3.$patch({
//   user: { name: 'elk', age: 18 },
//   userInfo: [{ name: 'elk', age: 18 }],
// })
// store3.$patch((state) => {
//   state.user = { name: 'elk', age: 18 }
//   state.userInfo = [{ name: 'elk', age: 18 }]
// })
console.log('🚀 ~ store3.userInfo:', store3.userInfo)
console.log('🚀 ~ store3.user:', store3.user)

// store3.user = { name: 'elk', age: 18 }

// console.log('🚀 ~ store3.user:', store3.user)

// store3.$reset()

// console.log('🚀 ~ store3.user-$reset:', store3.user)
