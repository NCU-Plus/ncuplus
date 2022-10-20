import { marked } from "marked";
import hljs from "highlight.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", () => {
    marked.setOptions({
      highlight: (code, lang) => {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: "hljs language-",
      breaks: true,
    });
  });
});
