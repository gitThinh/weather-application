<template>
  <div class="px-2 py-4 bg-info-active border border-info-light shadow-md shadow-neutral-800 w-full rounded-full" :class="class">
    <div class="text-center flex flex-col items-center gap-3 h-full">
      <div>
        <p class="text-sm">{{ timer.getDayNumber() }}</p>
        <p class="text-sm font-medium">{{ timer.date.getHours() < 10 ? `0${timer.date.getHours()}:00` : `${timer.date.getHours()}:00` }}</p>
      </div>
      <div class="flex-1 w-full flex items-center justify-center">
        <NuxtImg :src="iconWeather" alt="" class="w-3/4 object-contain mx-auto" />
      </div>
      <div class="flex items-center">
        <p class="font-medium text-lg">{{ mainTemp }}&deg</p>
        <!-- <NuxtImg src="/icons/doC.png" alt="" class="w-4 h-4 object-contain" /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { weatherLocationResponse } from '~/types/weatherLocationResponse';
import converSecondToDate from '~/utils/convertSecondToDate';

const props = defineProps<{
  data: weatherLocationResponse;
  class?: string;
}>();
const timer = computed(() => converSecondToDate(props.data.dt || 0))

const mainTemp = computed(() => Math.ceil(props.data.main.temp || 0));

const iconWeather = computed(() =>
  convertWeathericon(props.data.weather[0].description, props.data.weather[0].icon)
);
</script>
