<template>
  <div class="text-center space-y-2">
    <p><span class="font-semibold text-xl">{{ `${humidity}% ` }}</span>{{ humidityStatus }}</p>
    <ShareMultiProgressBar :total="humidity" :ranges="humidityThresholds"/>
  </div>
</template>

<script lang="ts" setup>
const { currentWeatherInfo } = useCurrentWeather();

// var
const humidityThresholds = [
  { max: 30, status: 'bad' },
  { max: 40, status: 'normal' },
  { max: 60, status: 'good' },
  { max: 70, status: 'normal' },
  { max: 100, status: 'bad' }
];

// computed
const humidity = computed(() => currentWeatherInfo.value?.main?.humidity || 0)
const humidityStatus = computed(() => {
  const hum = humidity.value;
  if (!hum || hum > 100) return 'unknown';
  const threshold = humidityThresholds.find(t => hum <= t.max);
  return threshold ? threshold.status : 'unknown';
});
</script>