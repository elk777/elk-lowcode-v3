## 问题记录

> 在编写过程中记录遇到的问题，比如组件使用问题、设计思路问题等等

### 组件问题

1、NaiveUI中的n-form组件中的rules验证，排序号必填验证：使用的n-input-number组件，此字段默认给了一个初始值 0「number类型」此时rules中正常配置

```typescript
const rules = {
  orderNum: [
    {
      required: true,
      message: '请输入排序号',
      trigger: 'blur',
    },
  ],
}
// 此时验证是一直无法通过，就是修改排序号为 1、2、3最后提交的时候调用表单的validate验证一直不通过
```

解决方案：需要自定义验证函数来明确允许0作为有效值

```typescript
const rules = {
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
}
// 新增一个validator函数自定义验证规则
```

### 渲染机制问题

1、当我们使用h()函数时，第三个参数直接传递了字符串，这个参数相当于插槽属性配置，直接传递字符串，vue3会出现黄色提示

> vue3提倡使用函数形式传递插槽内容，而非直接传递字符串等非函数值

```typescript
Vue 3 中， h() 函数的第三个参数规则：
	- 对于 普通元素 （如 <div> ）：可直接传字符串/数组作为子内容
	- 对于 组件 ：需传 对象 ，键为插槽名，值为 渲染函数 （返回插槽内容）
	- 使用函数插槽能提高性能，因为 Vue 可以缓存插槽渲染结果，避免不必要的重渲染
```

