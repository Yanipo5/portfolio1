<script lang="ts" setup>
// import TodoItemDropdown from "./TodoItemDropdown.vue";
import TodoItemDelete from "./TodoItemDelete.vue";
import type { Todo } from "@/stores/todos";
import { Star, StarFilled } from "@element-plus/icons-vue";
import useTodosStore from "@/stores/todos";

const store = useTodosStore();

const props = defineProps<{
  todo: Todo;
}>();

function handleStar() {
  store.toggleTodoStar(props.todo.id);
}
function handleDelete() {
  store.deleteTodo(props.todo.id);
}
</script>

<template>
  <el-card shadow="hover" :body-style="{ padding: '2vw' }">
    <div class="todo-item-content">
      <span class="todo-item-content-star">
        <el-icon v-if="props.todo.isStar" @click="handleStar" color="gold" size="30px"><StarFilled /></el-icon>
        <el-icon v-else @click="handleStar" color="gold" fill="gold" size="30px"><Star /></el-icon>
      </span>
      <el-input class="todo-item-content-title" v-model="props.todo.title" />
      <span class="todo-item-content-delete">
        <TodoItemDelete :id="props.todo.id" />
      </span>
      <!-- <TodoItemDropdown :id="props.todo.id" /> -->
    </div>
  </el-card>
</template>

<style scoped>
.todo-item-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.todo-item-content-star {
  flex: 0 0 auto;
  margin-right: 1vw;
}

.todo-item-content-delete {
  flex: 0 0 auto;
  margin-left: 1vw;
}

.todo-item-content-title {
  flex: 1 0 10vw;
}
</style>
