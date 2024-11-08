<template>
  <div
    class="px-2 py-4 w-full h-full bg-info-active border border-info-light shadow-md shadow-neutral-800 rounded-xl"
    :class="class"
  >
    <div
      class="text-center flex flex-row justify-between items-center gap-3 h-full px-4 py-2"
    >
      <div class="space-y-2">
        <p class="font-medium text-5xl">{{ mainTemp }}&deg</p>
        <div class="space-x-3">
            <span class="text-lg font-medium">
              {{
                timer.date.getHours() < 10
                  ? `0${timer.date.getHours()}:00`
                  : `${timer.date.getHours()}:00`
              }}
            </span>
            <span>
              {{ timer.getDayNumber() }}
            </span>
        </div>
      </div>
      <div class="flex w-1/2 flex-col justify-end space-y-2">
        <NuxtImg
          :src="iconWeather"
          alt=""
          class="w-2/3 max-w-40 object-contain mx-auto"
        />
        <p class="text-lg font-medium">{{ statusWeather }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { weatherLocationResponse } from "~/types/weatherLocationResponse";
import converSecondToDate from "~/utils/convertSecondToDate";

const props = defineProps<{
  data: weatherLocationResponse;
  class?: string;
}>();
const timer = computed(() => converSecondToDate(props.data.dt || 0));

const mainTemp = computed(() => Math.ceil(props.data.main.temp || 0));

const statusWeather = computed(() => props.data.weather[0].description);

const iconWeather = computed(() =>
  convertWeathericon(
    props.data.weather[0].description,
    props.data.weather[0].icon
  )
);
</script>
