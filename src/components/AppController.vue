<script setup lang="ts">
import AppControllerSortDropdown from "./AppControllerSortDropdown.vue";
import { Search, Plus } from "@element-plus/icons-vue";
import useTodosStore from "@/stores/todos";

const store = useTodosStore();

const getPlaceholder = () => (!store.mode ? "Add Todo" : "Search Todo");
function handleInput() {
  if (store.mode) return;
  store.addTodo({ title: store.input });
  store.input = "";
}

const isAddButtonDisabled = () => store.mode || !store.input;
</script>

<template>
  <el-card class="card">
    <el-input v-model="store.input" :placeholder="getPlaceholder()" @keyup.enter="handleInput">
      <template #prepend class="card-prepend">
        <el-switch v-model="store.mode" :inline-prompt="true" style="--el-switch-off-color: var(--el-color-primary)" :active-icon="Search" :inactive-icon="Plus" inactive-color="primary" />
      </template>
    </el-input>

    <el-button type="primary" @click="handleInput" :disabled="isAddButtonDisabled()" class="button">Add</el-button>
    <AppControllerSortDropdown />
  </el-card>
</template>

<style scoped>
.card :deep(.el-card__body) {
  display: flex;
  background: var(--todo-bg);
  padding: var(--todo-vw);
}
.card :deep(.el-input-group__prepend) {
  padding: var(--todo-vw);
}

.button {
  height: auto;
}
.card :deep(.el-input-group__prepend) {
  box-shadow: unset;
  background: transparent;
}
</style>
