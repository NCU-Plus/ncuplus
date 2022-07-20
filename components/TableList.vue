<template>
  <table class="bg-white mb-6 w-full text-left">
    <thead>
      <tr>
        <th
          v-for="(title, i) of titles"
          :key="i"
          class="p-2 pl-3 align-middle border-t-gray-400"
        >
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, i) of rows"
        :key="i"
        class="cursor-pointer hover:bg-gray-50"
        @click="navigateTo(row.linkUrl)"
      >
        <th
          v-for="(column, j) of row.columns"
          :key="j"
          class="p-2 pl-3 align-middle border-t-gray-400"
        >
          {{ column }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  titles: string[];
  rows: { columns: Record<string, string>; linkUrl: string }[];
}>();
</script>
