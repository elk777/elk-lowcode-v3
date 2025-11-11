<!--
 * @Description: 标签导航栏
 * @Autor: lyf
 * @Date: 2025-11-11 14:47:31
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-11 17:05:35
 * @FilePath: \v3-admin-lowcode\src\layout\component\TagsView\index.vue
-->
<template>
  <div>
    <n-tabs
      :value="activeName"
      size="small"
      type="card"
      closable
      @close="removeTab"
      add-tab-class="tab-class"
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
import { ref, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { useTagsViewStore } from "@/stores/tagsview";
const route = useRoute();
const router = useRouter();
const tagsViewStore = useTagsViewStore();
console.log("🚀 ~ route:", route);
const activeName = ref();
const tabs = ref([]);

const addTags = () => {
  const { name } = route;
  if (name) {
    tagsViewStore.addView(route);
  }
};

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
watchEffect(() => {
  const { path } = route;
  console.log("🚀 ~ route-watch-Effect:", route);
  console.log("🚀 ~ visitedViews-watch-Effect:", tagsViewStore.visitedViews);
  activeName.value = path;
  addTags();
});

const updateTab = (path: string) => {
  //  路由跳转
  router.push(path);
};
const removeTab = (path: string) => {
  console.log("🚀 ~ removeTab ~ path:", path);
  if (path) {
    tagsViewStore.delView(path);
  }
};
</script>

<style lang="css" scoped>
.tab-class {
  border-radius: 10px;
}
</style>
