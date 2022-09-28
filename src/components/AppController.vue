<script setup lang="ts">
import AppControllerSortDropdown from './AppControllerSortDropdown.vue';
import { Search, Plus } from '@element-plus/icons-vue';
import useTodosStore from '@/stores/todos';

const store = useTodosStore();

const getPlaceholder = () => (!store.mode ? 'Add Todo' : 'Search Todo');
function onEnter() {
  if (store.mode) return;
  store.addTodo({ title: store.input });
  store.input = '';
}
</script>

<template>
  <el-card class="card">
    <el-input v-model="store.input" :placeholder="getPlaceholder()" @keyup.enter="onEnter">
      <template #prepend class="card-prepend">
        <el-switch v-model="store.mode" :inline-prompt="true" style="--el-switch-off-color: var(--el-color-primary)" :active-icon="Search" :inactive-icon="Plus" inactive-color="primary" />
      </template>

      <template #append>
        <div><AppControllerSortDropdown /></div>
      </template>
    </el-input>
  </el-card>
</template>

<style scoped>
.card :deep(.el-card__body) {
  background: var(--todo-bg);
  padding: var(--todo-vw);
}
.card :deep(.el-input-group__prepend) {
  padding: var(--todo-vw);
}

.card :deep(.el-input-group__prepend),
.card :deep(.el-input-group__append) {
  background: var(--todo-bg);
}

.card :deep(.el-input-group__prepend) {
  box-shadow: unset;
  background: transparent;
}
</style>
