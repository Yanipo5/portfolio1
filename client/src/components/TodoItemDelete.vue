<script lang="ts" setup>
import { Delete } from "@element-plus/icons-vue";
import useTodosStore from "@/stores/todos";
import { ref } from "vue";

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

  <el-dialog v-model="dialogVisible" title="Delete Todo?" width="90%">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="danger" @click="handleDelete">Delete</el-button>
  </el-dialog>
</template>

<style scoped></style>
