<template>
  <!-- eslint-disable-next-line -->
  <article class="prose text-left overflow-hidden" v-html="dom"></article>
</template>

<script setup lang="ts">
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const props = defineProps<{
  content: string;
}>();

const dom = computed(() => DOMPurify.sanitize(marked.parse(props.content)));
</script>
