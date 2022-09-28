<script lang="ts" setup>
import TodoItemDelete from './TodoItemDelete.vue';
import TodoItemCheck from './TodoItemCheck.vue';
import type { Todo } from '@/stores/todos';
import { Star, StarFilled } from '@element-plus/icons-vue';
import useTodosStore from '@/stores/todos';

const store = useTodosStore();
const props = defineProps<{ todo: Todo }>();
const handleStar = () => store.toggleTodoStar(props.todo.id);
</script>

<template>
  <el-card shadow="hover" :body-style="{ padding: 'var(--todo-vw)' }" class="card">
    <div class="todo-item-content">
      <span class="todo-item-content-star">
        <el-icon v-if="props.todo.isStar" @click="handleStar" color="gold" size="30px" class="star-align"><StarFilled class="StarFilled" /></el-icon>
        <el-icon v-else @click="handleStar" color="gold" size="30px"><Star /></el-icon>
      </span>
      <el-input class="todo-item-content-title" v-model="props.todo.title" />
      <span class="todo-item-content-delete">
        <TodoItemCheck :id="props.todo.id" :isDone="props.todo.isDone" />
      </span>
      <span class="todo-item-content-delete">
        <TodoItemDelete :id="props.todo.id" />
      </span>
    </div>
  </el-card>
</template>

<style scoped>
.card :deep(.el-input__wrapper) {
  transition: 0.2s ease-in;
  box-shadow: none;
  background-color: transparent;
}
.card :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
  background-color: black;
}
.card :deep(.el-card__body) {
  background: var(--todo-bg);
}

.todo-item-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.todo-item-content-star {
  flex: 0 0 auto;
  margin-right: 1vw;
}
.todo-item-content-star :deep(svg.StarFilled) {
  scale: 1.2;
}

.todo-item-content-delete {
  flex: 0 0 auto;
  margin-left: 1vw;
}

.todo-item-content-title {
  flex: 1 0 10vw;
}
</style>
