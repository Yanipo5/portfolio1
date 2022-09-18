<script lang="ts" setup>
import { CircleCheck, CircleCheckFilled } from "@element-plus/icons-vue";
import useTodosStore from "@/stores/todos";

const store = useTodosStore();

const props = defineProps<{
  id: string;
  isDone: boolean;
}>();

function handleCheck() {
  store.toggleTodoDone(props.id);
}
</script>

<template>
  <el-icon v-if="!props.isDone" size="24px" @click="handleCheck"><CircleCheck color="var(--el-color-success)" /></el-icon>
  <el-icon v-else size="24px" @click="handleCheck"><CircleCheckFilled color="var(--el-color-success)" /></el-icon>
</template>

<style scoped></style>
