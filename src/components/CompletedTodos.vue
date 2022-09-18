<script setup lang="ts">
import TodoItem from "./TodoItem.vue";
import useTodosStore from "@/stores/todos";
import { ref } from "vue";

const showCompletedTodo = ref(false);
const store = useTodosStore();
</script>

<template>
  <el-card v-if="store.completedTodos.length > 0" :body-style="{ padding: 'var(--todo-vw)' }" class="selector-card">
    <el-switch v-model="showCompletedTodo" class="switch" />
    <span> {{ showCompletedTodo ? "Show" : "Hide" }} Completed Todos</span>
  </el-card>
  <TodoItem v-if="showCompletedTodo" v-for="todo in store.completedTodos" :todo="todo" class="todo-item" />
</template>

<style scoped>
.selector-card :deep(.el-card__body) {
  background: var(--todo-bg);
  display: flex;
  align-items: center;
  padding: var(--todo-vw);
}
.selector-card {
  margin: var(--todo-vw) 0;
}
.switch {
  margin-right: var(--todo-vw);
}
.todo-item {
  margin-bottom: 0.5vh;
}
</style>
