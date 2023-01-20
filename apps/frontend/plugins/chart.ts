import {
  Chart as ChartJS,
  ArcElement,
  PieController,
  Title,
  Tooltip,
  Legend,
  SubTitle,
} from "chart.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", () => {
    ChartJS.register(
      PieController,
      ArcElement,
      Title,
      Tooltip,
      Legend,
      SubTitle,
    );
  });
});
