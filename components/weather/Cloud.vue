<template>
    <div class="text-center space-y-2">
      <p class="font-semibold text-xl">{{ cloudStatus }}</p>
      <ShareMultiProgressBar :total="cloud" :ranges="cloudThresholds" show="status"/>
    </div>
  </template>
  
  <script lang="ts" setup>
  const weatherStore = useWeatherStore();
  
  // var
  const cloudThresholds = [
    { max: 25, status: 'Few' },
    { max: 50, status: 'Scattered' },
    { max: 85, status: 'Broken' },
    { max: 100, status: 'Overcast' },
  ];
  
  // computed
  const cloud = computed(() => weatherStore.currentWeatherInfo?.clouds.all || 0)
  const cloudStatus = computed(() => {
    const percent = cloud.value;
    if (!percent || percent > 100) return 'Clear';
    const threshold = cloudThresholds.find(t => percent <= t.max);
    return threshold ? threshold.status : 'Clear';
  });
  </script>