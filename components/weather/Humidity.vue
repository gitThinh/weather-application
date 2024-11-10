<template>
  <div class="text-center space-y-2">
    <p class="font-semibold text-xl">
      {{ `${humidity ? humidity : randomNumber}% ` }}
    </p>
    <ShareMultiProgressBar :total="humidity" :ranges="humidityThresholds" />
  </div>
</template>

<script lang="ts" setup>
const weatherStore = useWeatherStore();

// var
const humidityThresholds = [
  { max: 30, status: "bad" },
  { max: 40, status: "normal" },
  { max: 60, status: "good" },
  { max: 70, status: "normal" },
  { max: 100, status: "bad" },
];

// computed
const randomNumber = randomNumberPerTime(0, 100, 100);
const humidity = computed(
  () => weatherStore.currentWeatherInfo?.main?.humidity || 0
);
</script>
