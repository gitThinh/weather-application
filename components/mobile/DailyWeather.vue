<template>
  <div class="space-y-4">
    <div v-for="(item, index) in items" :key="index" class="lg:p-2 xl:p-3">
      <WeatherBigerState
        :data="item"
        class="bg-info-light border-info-normal h-full"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

const dailyWeather = useDailyWeather();

// state
const items = computed(() => dailyWeather.dailyWeatherInfo.value?.list ?? []);
</script>
