<template>
  <!-- eslint-disable-next-line -->
  <article class="prose text-left overflow-hidden" v-html="dom"></article>
</template>

<script setup lang="ts">
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import hljs from "highlight.js";

const props = defineProps<{
  content: string;
}>();

marked.setOptions({
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
  breaks: true,
});

const dom = computed(() => DOMPurify.sanitize(marked.parse(props.content)));
</script>
