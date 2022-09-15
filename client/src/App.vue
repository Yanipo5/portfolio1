<script setup lang="ts">
import TodoItem from "./components/TodoItem.vue";
import AppController from "./components/AppController.vue";
import useTodosStore from "@/stores/todos";

const store = useTodosStore();
</script>

<template>
  <div class="app">
    <AppController class="app-controller" />
    <TodoItem v-for="todo in store.todos" :todo="todo" class="todo-item" />
  </div>
</template>

<style scoped>
.app {
}
.app-controller {
  margin-bottom: 2vh;
}
.todo-item {
  margin-bottom: 0.5vh;
}
</style>
