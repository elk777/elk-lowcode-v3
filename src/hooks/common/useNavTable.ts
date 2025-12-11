/*
 * @Author: elk
 * @Date: 2025-12-09 14:08:43
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-10 15:30:15
 * @FilePath: /elk-lowcode-v3/src/hooks/common/useNavTable.ts
 * @Description: 通用表格 hook封装
 */
import { ref, onMounted } from 'vue'
import type { PaginationProps, DataTableColumn } from 'naive-ui'
import type { IResponse } from '@/interfaces/response'
// 定义hooks参数接口
export interface UseNavTableOptions<T> {
  //  API请求函数
  fetchData: (...args: unknown[]) => Promise<IResponse>
  //  表格列配置
  columns: DataTableColumn<T>[]
  //  分页配置
  pagination?: Partial<PaginationProps>
  //  是否在初始化时加载数据
  autoLoad?: boolean
  //  数据转换函数
  transformData?: (data: T[]) => T[]
}
/**
 * @description: 通用表格
 * @param {UseNavTableOptions<T>} options - 配置选项
 * @return {*} 表格数据、加载状态、分页配置、数据总数、表格列配置、查询参数、加载数据函数、更改分页、更改每页条数、设置查询参数、重置查询参数、搜索功能、刷新数据
 */
export function useNavTable<T>(options: UseNavTableOptions<T>) {
  //  表格数据
  const tableData = ref<T[]>([])
  //  加载状态
  const loading = ref(false)
  // 分页配置
  const pagination = ref<PaginationProps>({
    itemCount: 200,
    pageCount: 10,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50],
    page: 1,
    showSizePicker: true,
    showQuickJumper: true,
    ...options.pagination,
  })
  //  数据总数
  const total = ref<number>(0)
  //  表格配置
  const columns = ref<DataTableColumn<T>[]>(options.columns)
  //  查询参数
  const queryParams = ref<Record<string, unknown>>({})
  //  加载数据函数
  const loadData = async (params?: unknown) => {
    try {
      loading.value = true
      // 合并查询参数
      const mergedParams = {
        ...queryParams.value,
        ...(params || {}),
      }
      const res = await options.fetchData(mergedParams)
      if (res.code === 200) {
        // 处理数据转换情况
        const transformedData = options.transformData
          ? options.transformData(res.data as T[])
          : (res.data as T[])
        tableData.value = transformedData
        // 设置总条数
        if (res.total !== undefined) {
          total.value = res.total
        }
      }
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      loading.value = false
    }
  }
  // 更改分页
  const onUpdatePage = (page: number) => {
    pagination.value.page = page
    loadData()
  }
  // 更改每页条数
  const onUpdatePageSize = (pageSize: number) => {
    pagination.value.pageSize = pageSize
    loadData()
  }
  // 设置查询参数
  const setQueryParams = (params: unknown) => {
    Object.assign(queryParams.value, params)
  }
  // 重置查询参数
  const resetQueryParams = () => {
    queryParams.value = {}
    // 重置为第一页
    pagination.value.page = 1
  }
  // 搜索功能
  const search = async (params?: unknown) => {
    // 重置为第一页
    resetQueryParams()
    if (params) {
      setQueryParams(params)
    }
    await loadData()
  }
  // 刷新数据
  const refresh = async () => {
    await loadData()
  }
  // 遍历columns的width属性，累加宽度
  const totalWidth = columns.value.reduce((acc, cur) => acc + (cur.width as number || 0), 0)
  //  初始化时加载数据
  onMounted(() => {
    if (options.autoLoad) {
      loadData()
    }
  })
  return {
    tableData,
    loading,
    columns,
    total,
    pagination,
    setQueryParams,
    resetQueryParams,
    search,
    refresh,
    onUpdatePage,
    onUpdatePageSize,
    totalWidth
  }
}
