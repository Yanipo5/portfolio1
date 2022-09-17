<script setup lang="ts">
import TodoItem from "./TodoItem.vue";
import useTodosStore from "@/stores/todos";
import { ref } from "vue";

const showCompletedTodo = ref(false);
const store = useTodosStore();
</script>

<template>
  <el-card v-if="store.completedTodos.length > 0" :body-style="{ padding: '2vw' }" class="card">
    <el-switch v-model="showCompletedTodo" class="switch" />
    <span> {{ showCompletedTodo ? "Show" : "Hide" }} Completed Todos</span>
  </el-card>
  <TodoItem v-if="showCompletedTodo" v-for="todo in store.completedTodos" :todo="todo" class="todo-item" />
</template>

<style scoped>
.card {
  margin: var(--todo-vw) 0;
}
.card :deep(el-card__body) {
  display: flex;
  align-items: center;
}
.switch {
  margin-right: var(--todo-vw);
}
.todo-item {
  margin-bottom: 0.5vh;
}
</style>
