<template>
  <div class="space-y-3">
    <div class="mainTemp flex items-center justify-center">
      <h3 class="text-4xl font-semibold text-info-dark">
        {{ feelLike ? feelLike : randomNumber }}
      </h3>
      <NuxtImg :src="getIconUnit()" class="w-7" />
    </div>
    <div class="flex justify-around">
      <div class="flex items-center justify-center">
        <p class="font-medium text-lg">
          H:
          <span class="text-info-dark">{{
            maxTemp ? maxTemp : randomNumber
          }}</span>
        </p>
        <NuxtImg :src="getIconUnit()" class="w-3" />
      </div>
      <div class="flex items-center justify-center">
        <p class="font-medium text-lg">
          L:
          <span class="text-info-dark">{{
            minTemp ? minTemp : randomNumber
          }}</span>
        </p>
        <NuxtImg :src="getIconUnit()" class="w-3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getIconUnit } = useUnitsTemp();
const weatherStore = useWeatherStore();

// computed
const randomNumber = randomNumberPerTime(0, 100, 100);
const feelLike = computed(() =>
  Math.round(weatherStore.currentWeatherInfo?.main?.feels_like || 0)
);
const maxTemp = computed(() =>
  Math.round(weatherStore.currentWeatherInfo?.main?.temp_max || 0)
);
const minTemp = computed(() =>
  Math.round(weatherStore.currentWeatherInfo?.main?.temp_min || 0)
);
</script>
