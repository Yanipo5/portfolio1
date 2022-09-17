<script setup lang="ts">
import AppControllerDropdown from "./AppControllerDropdown.vue";
import { Search, Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
import useTodosStore from "@/stores/todos";

const store = useTodosStore();

const input = ref("");
const mode = ref(false);
const placeholder = mode ? "Add Todo" : "Search Todo";
function onEnter() {
  store.addTodo({ title: input.value });
  input.value = "";
}
</script>

<template>
  <el-card class="card">
    <el-input v-model="input" :placeholder="placeholder" @keyup.enter="onEnter">
      <template #prepend>
        <el-switch v-model="mode" :inline-prompt="true" style="--el-switch-off-color: var(--el-color-primary)" :active-icon="Search" :inactive-icon="Plus" inactive-color="primary" />
      </template>

      <template #append>
        <div><AppControllerDropdown /></div>
      </template>
    </el-input>
  </el-card>
</template>

<style scoped>
.card :deep(.el-card__body) {
  padding: var(--todo-vw);
}
.card :deep(.el-input-group__prepend) {
  padding: var(--todo-vw);
}
</style>
