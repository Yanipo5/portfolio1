<script setup lang="ts">
import TodoItem from './components/TodoItem.vue';
import AppController from './components/AppController.vue';
import CompletedTodos from './components/CompletedTodos.vue';
import useTodosStore from '@/stores/todos';

const store = useTodosStore();
</script>

<template>
  <div class="app">
    <AppController class="app-controller" />
    <TransitionGroup name="list">
      <TodoItem v-for="todo in store.unCompletedTodos" :todo="todo" class="todo-item" :key="todo.id" />
    </TransitionGroup>
    <CompletedTodos />
  </div>
</template>

<style scoped>
.app-controller {
  margin-bottom: 2vh;
}
.todo-item {
  margin-bottom: 0.5vh;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
