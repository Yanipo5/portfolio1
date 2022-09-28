<script setup lang="ts">
import { SortUp, SortDown } from '@element-plus/icons-vue';
import useTodosStore from '@/stores/todos';

const store = useTodosStore();
</script>

<template>
  <el-dropdown>
    <el-button :icon="store.sort.sortDirection ? SortUp : SortDown" class="sort-button" aria-label="Sort Selector" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="() => store.setSort('Title')"><span :class="{ selected: store.sort.sortBy === 'Title' }">Title</span></el-dropdown-item>
        <el-dropdown-item @click="() => store.setSort('CreatedAt')"><span :class="{ selected: store.sort.sortBy === 'CreatedAt' }">Insertion</span></el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.selected {
  font-weight: bold;
}
.sort-button :deep(svg) {
  color: var(--todo-color);
}
</style>
