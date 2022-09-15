<script setup lang="ts">
import { Sort } from "@element-plus/icons-vue";
</script>

<template>
  <el-dropdown>
    <el-button :icon="Sort" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Title</el-dropdown-item>
        <el-dropdown-item>Incertion</el-dropdown-item>
        <el-dropdown-item>Due Date</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>
