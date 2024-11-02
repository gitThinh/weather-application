<template>
    <div class="text-center space-y-2">
      <span class="font-semibold text-xl">
        {{ `${wind} m/s ` }}
        <span class="font-semibold text-xl text-nowrap">{{ windStatus }}</span>
      </span>
      <ShareMultiProgressBar :total="wind" :ranges="windThresholds"/>
    </div>
  </template>
  
  <script lang="ts" setup>
 const weatherStore = useWeatherStore();
  
  // var
  const windThresholds = [
    { max: 5, status: 'Calm' },
    { max: 10, status: 'Gentle Breeze' },
    { max: 17, status: 'Moderate Wind' },
    { max: 25, status: 'Gale' },
    { max: 35, status: 'Storm' },
  ];
  
  // computed
  const wind = computed(() => weatherStore.currentWeatherInfo?.wind?.speed || 0)
  const windStatus = computed(() => {
    const percent = wind.value;
    if (!percent || percent > 100) return 'Calm';
    const threshold = windThresholds.find(t => percent <= t.max);
    return threshold ? threshold.status : 'Calm';
  });
  </script>