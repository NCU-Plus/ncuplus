export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", async () => {
    window.scrollTo({ top: 0 });
  });
});
