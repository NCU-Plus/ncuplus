import { marked } from "marked";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { mangle } from "marked-mangle";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { gfmHeadingId } from "marked-gfm-heading-id";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", () => {
    marked.use(
      markedHighlight({
        langPrefix: "hljs language-",
        highlight: (code, lang) => {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      }),
      mangle(),
      gfmHeadingId(),
    );
    marked.setOptions({
      breaks: true,
      async: false,
    });
  });
});
