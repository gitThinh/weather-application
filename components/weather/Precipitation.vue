<template>
    <div class="text-center space-y-2">
      <p class="font-semibold text-xl">{{ `${wind} m/s ` }}{{ windStatus }}</p>
      <ShareMultiProgressBar :total="wind" :ranges="windThresholds"/>
    </div>
  </template>
  
  <script lang="ts" setup>
  const { currentWeatherInfo } = useCurrentWeather();
  
  // var
  const windThresholds = [
    { max: 5, status: 'Calm' },
    { max: 10, status: 'Gentle Breeze' },
    { max: 17, status: 'Moderate Wind' },
    { max: 25, status: 'Gale' },
    { max: 35, status: 'Storm' },
  ];
  
  // computed
  const wind = computed(() => currentWeatherInfo.value?.wind?.speed || 0)
  const windStatus = computed(() => {
    const percent = wind.value/1000;
    if (!percent || percent > 100) return 'Calm';
    const threshold = windThresholds.find(t => percent <= t.max);
    return threshold ? threshold.status : 'Calm';
  });
  </script>