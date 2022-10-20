export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-outside", {
    beforeMount(el, binding) {
      document.addEventListener("click", binding.value(el));
    },
    beforeUnmount(el, binding) {
      document.removeEventListener("click", binding.value(el));
    },
  });
});
