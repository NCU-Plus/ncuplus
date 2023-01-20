<template>
  <Pie
    :data="{
      labels,
      datasets: [
        {
          data,
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    }"
    :options="{
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 20,
          },
        },
        subtitle: {
          display: !isNaN(avg),
          text: `平均值：${avg}`,
          font: {
            size: 16,
          },
        },
        tooltip: {
          callbacks: {
          label: (context: any) => 
              context.parsed + '人'
          }
        }
      },
    }"
  />
</template>

<script setup lang="ts">
import { Pie } from "vue-chartjs";

const props = defineProps<{
  title: string;
  rating: { value: number }[];
}>();

const labels = computed(() => {
  const labels = [];
  for (let i = 1; i <= 10; i++) {
    labels.push(i.toString());
  }
  return labels;
});

const data = computed(() => {
  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push(0);
  }
  for (const e of props.rating) {
    data[e.value - 1]++;
  }
  return data;
});

const avg = computed(() => {
  let sum = 0;
  for (const e of props.rating) {
    sum += e.value;
  }
  return sum / props.rating.length;
});
</script>
