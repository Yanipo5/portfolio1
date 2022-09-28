<script setup lang="ts">
import TodoItem from "./components/TodoItem.vue";
import AppController from "./components/AppController.vue";
import CompletedTodos from "./components/CompletedTodos.vue";
import useTodosStore from "@/stores/todos";

const store = useTodosStore();
</script>

<template>
  <div class="app">
    <AppController class="app-controller" />
    <TodoItem v-for="todo in store.unCompletedTodos" :todo="todo" class="todo-item" />
    <CompletedTodos />
    {{ store }}
  </div>
</template>

<style scoped>
.app-controller {
  margin-bottom: 2vh;
}
.todo-item {
  margin-bottom: 0.5vh;
}
</style>
