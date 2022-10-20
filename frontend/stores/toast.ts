import { acceptHMRUpdate, defineStore } from "pinia";

export enum ToastType {
  SUCCESS = 0,
  WARNING = 1,
  ERROR = 2,
}

export interface Toast {
  type: ToastType;
  message: string;
}

export const useToast = defineStore("toast", {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    pushToast(toast: Toast) {
      this.toasts.push(toast);
      setTimeout(() => this.toasts.shift(), 5000);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToast, import.meta.hot));
}
