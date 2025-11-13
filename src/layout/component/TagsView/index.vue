<!--
 * @Description: 标签导航栏
 * @Autor: lyf
 * @Date: 2025-11-11 14:47:31
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-13 15:05:18
 * @FilePath: \v3-admin-lowcode\src\layout\component\TagsView\index.vue
-->
<template>
  <div>
    <n-tabs
      v-model:value="activeName"
      size="small"
      type="card"
      closable
      @close="removeTab"
      @update-value="updateTab"
    >
      <n-tab-pane
        v-for="item in tagsViewStore.visitedViews"
        :key="item.path"
        :name="item.path"
        :closable="tabClosable(item)"
      >
        <template #tab>
          <div>
            {{ item.meta.title }}
          </div>
        </template>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from "naive-ui";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { useTagsViewStore } from "@/stores/tagsview";
const route = useRoute();
const router = useRouter();
const tagsViewStore = useTagsViewStore();
const defaultPath = route.path;
const activeName = ref(defaultPath);

const addTags = () => {
  const { path } = route;
  if (path) {
    tagsViewStore.addView(route);
  }
};
addTags();

/**
 * @description: 标签页导航删除图标显隐
 * @param {*} computed
 * @return {*}
 * @author: lyf
 */
const tabClosable = computed(() => {
  return (route: RouteLocationNormalizedLoadedGeneric) => {
    if (route.meta.affix || tagsViewStore.visitedViews.length <= 1) {
      return false;
    }
    return true;
  };
});
watch(
  () => route.path,
  (path) => {
    activeName.value = path;
    addTags();
  }
);

const updateTab = (path: string) => {
  //  路由跳转
  router.push(path);
};
const removeTab = (path: string) => {
  if (path) {
    tagsViewStore.delView(path);
  }
};
</script>

<style scoped></style>
