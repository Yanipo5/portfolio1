<script lang="ts" setup>
import { Check, Delete, More } from "@element-plus/icons-vue";
import useTodosStore from "@/stores/todos";

const props = defineProps<{
  id: string;
}>();
const store = useTodosStore();

function handleDone() {
  store.toggleTodoDone(props.id);
}
function handleDelete() {
  store.deleteTodo(props.id);
}
</script>

<template>
  <el-dropdown>
    <el-button :icon="More" circle />
    <template #dropdown>
      <el-dropdown-menu>
        <span class="el-dropdown-item-icon"
          ><el-dropdown-item><el-button type="success" :icon="Check" circle @click="handleDone" /></el-dropdown-item
        ></span>
        <span class="el-dropdown-item-icon"
          ><el-dropdown-item><el-button type="danger" :icon="Delete" circle @click="handleDelete" /></el-dropdown-item
        ></span>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.el-dropdown-item-icon :deep(.el-icon) {
  margin-right: unset;
}
</style>
