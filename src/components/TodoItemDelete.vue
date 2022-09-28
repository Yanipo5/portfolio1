<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import useTodosStore from '@/stores/todos';
import { ref } from 'vue';

const dialogVisible = ref(false);

const store = useTodosStore();

const props = defineProps<{
  id: string;
}>();

function handleDelete() {
  store.deleteTodo(props.id);
  dialogVisible.value = false;
}
</script>

<template>
  <el-icon @click="dialogVisible = true" size="24px"><Delete color="var(--el-color-danger)" /> </el-icon>

  <el-dialog v-model="dialogVisible" title="Delete Todo?" width="90%" class="delete-dialog">
    <el-button @click="dialogVisible = false" plain aria-label="Cancel">Cancel</el-button>
    <el-button type="danger" @click="handleDelete" plain aria-label="Delete">Delete</el-button>
  </el-dialog>
</template>

<style>
.delete-dialog {
  background: var(--todo-bg) !important;
  border: solid 1px rgba(255, 255, 255, 50%) !important;
  border-radius: 6px !important;
}
</style>
