<template>
  <textarea ref="editor"></textarea>
</template>

<script setup lang="ts">
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const props = defineProps<{
  initialValue?: string;
  placeholder?: string;
}>();
const editor = ref<HTMLTextAreaElement | null>(null);
// ref EasyMDE instance would cause serious problems
let mdeInstance: EasyMDE | null = null;

watchEffect(async () => {
  if (editor.value) {
    const EasyMDE = (await import("easymde")).default;
    mdeInstance = new EasyMDE({
      element: editor.value,
      placeholder: props.placeholder,
      initialValue: props.initialValue,
      previewRender: (plainText) =>
        DOMPurify.sanitize(
          `<article class="prose text-left overflow-hidden">${marked.parse(
            plainText,
          )}</article>`,
        ),
      sideBySideFullscreen: false,
      toolbar: [
        "bold",
        "italic",
        "strikethrough",
        "heading",
        "code",
        "quote",
        "unordered-list",
        "ordered-list",
        "link",
        "image",
        "table",
        "horizontal-rule",
        "preview",
        "side-by-side",
        "guide",
      ],
      spellChecker: false,
      nativeSpellcheck: false,
    });
  }
});

function getMdeInstance() {
  if (!mdeInstance) throw new Error("editor is not ready");
  return mdeInstance;
}

defineExpose({
  getMdeInstance,
});
</script>
