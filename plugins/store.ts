import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export enum ToastType {
  SUCCESS = 0,
  WARNING = 1,
  ERROR = 2,
}

export interface Toast {
  type: ToastType;
  message: string;
}

export interface State {
  toasts: Toast[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    toasts: [],
  },
  mutations: {
    pushToast(state, toast: Toast) {
      state.toasts.push(toast);
    },
    shiftToast(state) {
      state.toasts.shift();
    },
  },
  actions: {
    async pushToast({ commit }, toast: Toast) {
      commit("pushToast", toast);
      return new Promise<void>((resolve) =>
        setTimeout(() => {
          commit("shiftToast");
          resolve();
        }, 5000)
      );
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store, key);
});
