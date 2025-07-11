# 防抖函数使用指南

## 概述

防抖（Debounce）是一种性能优化技术，用于限制函数的执行频率。它确保在指定的时间间隔内，无论触发多少次，函数只会执行一次。

## 主要特性

- ✅ **TypeScript 支持**：完整的类型定义
- ✅ **立即执行模式**：支持首次立即执行
- ✅ **取消功能**：可以取消待执行的函数
- ✅ **立即执行**：可以强制立即执行待执行的函数
- ✅ **简化版本**：提供简单易用的版本
- ✅ **完整测试**：包含全面的单元测试

## 安装和导入

```typescript
import { debounce, simpleDebounce } from './utils/debounce';
```

## 基本用法

### 1. 标准防抖

```typescript
const handleSearch = (query: string) => {
  console.log('搜索:', query);
};

// 创建防抖函数，延迟 300ms
const debouncedSearch = debounce(handleSearch, 300);

// 使用
debouncedSearch('apple');
debouncedSearch('application'); // 只有这个会执行
```

### 2. 立即执行模式

```typescript
const submitForm = (data: FormData) => {
  console.log('提交表单');
};

// 立即执行模式，防止重复提交
const debouncedSubmit = debounce(submitForm, 1000, { immediate: true });

debouncedSubmit(formData); // 立即执行
debouncedSubmit(formData); // 被忽略（1秒内）
```

### 3. 简化版防抖

```typescript
const logMessage = (msg: string) => {
  console.log(msg);
};

const debouncedLog = simpleDebounce(logMessage, 500);
debouncedLog('Hello World');
```

## 高级功能

### 取消防抖

```typescript
const debouncedFn = debounce(myFunction, 300);

debouncedFn('test');
debouncedFn.cancel(); // 取消执行
```

### 立即执行

```typescript
const debouncedFn = debounce(myFunction, 300);

debouncedFn('test');
debouncedFn.flush(); // 立即执行
```

## 常见使用场景

### 1. 搜索输入框

```typescript
// HTML
<input type="text" id="search-input" placeholder="搜索...">

// JavaScript/TypeScript
const searchInput = document.getElementById('search-input') as HTMLInputElement;

const performSearch = (query: string) => {
  if (query.trim()) {
    // 调用搜索 API
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        // 处理搜索结果
        console.log('搜索结果:', data);
      });
  }
};

const debouncedSearch = debounce(performSearch, 300);

searchInput.addEventListener('input', (event) => {
  const target = event.target as HTMLInputElement;
  debouncedSearch(target.value);
});
```

### 2. 窗口大小调整

```typescript
const handleResize = () => {
  console.log('窗口大小:', window.innerWidth, window.innerHeight);
  // 重新计算布局
  recalculateLayout();
};

const debouncedResize = debounce(handleResize, 250);
window.addEventListener('resize', debouncedResize);

// 清理
window.removeEventListener('resize', debouncedResize);
debouncedResize.cancel();
```

### 3. 滚动事件

```typescript
const handleScroll = () => {
  const scrollTop = window.pageYOffset;
  
  // 显示/隐藏回到顶部按钮
  const backToTopBtn = document.getElementById('back-to-top');
  if (scrollTop > 300) {
    backToTopBtn?.classList.add('visible');
  } else {
    backToTopBtn?.classList.remove('visible');
  }
};

const debouncedScroll = debounce(handleScroll, 100);
window.addEventListener('scroll', debouncedScroll);
```

### 4. 表单提交防重复

```typescript
const submitForm = async (formData: FormData) => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log('提交成功');
    }
  } catch (error) {
    console.error('提交失败:', error);
  }
};

// 使用立即执行模式，防止重复提交
const debouncedSubmit = debounce(submitForm, 2000, { immediate: true });

document.getElementById('submit-btn')?.addEventListener('click', (event) => {
  event.preventDefault();
  const form = document.getElementById('my-form') as HTMLFormElement;
  const formData = new FormData(form);
  debouncedSubmit(formData);
});
```

## 在框架中使用

### Vue.js

```typescript
// Vue 3 Composition API
import { ref, onMounted, onUnmounted } from 'vue';
import { debounce } from './utils/debounce';

export default {
  setup() {
    const searchQuery = ref('');
    const searchResults = ref([]);
    
    const performSearch = (query: string) => {
      // 执行搜索逻辑
      console.log('搜索:', query);
    };
    
    const debouncedSearch = debounce(performSearch, 300);
    
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      searchQuery.value = target.value;
      debouncedSearch(searchQuery.value);
    };
    
    onUnmounted(() => {
      debouncedSearch.cancel();
    });
    
    return {
      searchQuery,
      searchResults,
      handleInput
    };
  }
};
```

### React

```typescript
import { useState, useCallback, useEffect, useMemo } from 'react';
import { debounce } from './utils/debounce';

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const performSearch = useCallback((query: string) => {
    // 执行搜索逻辑
    console.log('搜索:', query);
  }, []);
  
  const debouncedSearch = useMemo(
    () => debounce(performSearch, 300),
    [performSearch]
  );
  
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };
  
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="搜索..."
    />
  );
}
```

## 性能考虑

1. **选择合适的延迟时间**：
   - 搜索输入：200-300ms
   - 窗口调整：100-250ms
   - 滚动事件：50-100ms
   - 按钮防重复：1000-2000ms

2. **内存管理**：
   - 在组件销毁时调用 `cancel()` 方法
   - 避免创建过多的防抖函数实例

3. **选择合适的版本**：
   - 简单场景使用 `simpleDebounce`
   - 需要高级功能使用 `debounce`

## API 参考

### debounce(func, delay, options?)

**参数：**
- `func`: 需要防抖的函数
- `delay`: 延迟时间（毫秒）
- `options`: 配置选项
  - `immediate`: 是否立即执行（默认：false）

**返回值：**
防抖后的函数，包含以下方法：
- `cancel()`: 取消待执行的函数
- `flush()`: 立即执行待执行的函数

### simpleDebounce(func, delay)

**参数：**
- `func`: 需要防抖的函数
- `delay`: 延迟时间（毫秒）

**返回值：**
简化的防抖函数

## 测试

运行测试：

```bash
npm test debounce.test.ts
```

测试覆盖了以下场景：
- 基本防抖功能
- 立即执行模式
- 取消和立即执行功能
- 参数传递
- 性能测试
- 实际使用场景
