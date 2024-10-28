<template>
  <div class="px-2 py-4 bg-info-active border border-info-light shadow-md shadow-neutral-800 w-max rounded-full" :class="class">
    <div class="text-neutral-100 text-center flex flex-col items-center gap-3">
      <p class="text-sm">{{ data.hour }}</p>
      <NuxtImg :src="iconWeather" alt="" class="w-8 object-contain" />
      <div class="flex items-center">
        <p>{{ mainTemp }}</p>
        <NuxtImg src="/icons/doC.png" alt="" class="w-5 h-5 object-contain" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface weatherHourData {
  hour: string;
  desc: string;
  icon: string;
  temp: number;
}

const props = defineProps<{
  data: weatherHourData;
  class?: string;
}>();
const mainTemp = computed(() => Math.ceil(props.data.temp));

const iconWeather = computed(() =>
  convertWeathericon(props.data.desc, props.data.icon)
);
</script>
