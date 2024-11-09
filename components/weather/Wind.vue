<template>
    <div class="text-center space-y-2">
      <span class="font-semibold text-xl">
        {{ `${wind} m/s ` }}
        <span class="font-semibold text-xl text-nowrap">{{ t(`wind.${windStatus}`) }}</span>
      </span>
      <ShareMultiProgressBar :total="wind" :ranges="windThresholds"/>
    </div>
  </template>
  
  <script lang="ts" setup>
 const weatherStore = useWeatherStore();
 const {t} = useI18n();
  
  // var
  const windThresholds = [
    { max: 5, status: 'calm' },
    { max: 10, status: "gentleBreeze" },
    { max: 17, status: "moderateWind" },
    { max: 25, status: "gale" },
    { max: 35, status: "storm" },
  ];
  
  // computed
  const wind = computed(() => weatherStore.currentWeatherInfo?.wind?.speed || 0)
  const windStatus = computed(() => {
    const percent = wind.value;
    if (!percent || percent > 100) return "calm";
    const threshold = windThresholds.find(t => percent <= t.max);
    return threshold ? threshold.status : "calm";
  });
  </script>