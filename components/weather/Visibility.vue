<template>
    <div class="text-center space-y-2">
      <p class="font-semibold text-xl">{{ visionStatus }}</p>
      <ShareMultiProgressBar :total="vision/1000" :ranges="visionThresholds"/>
    </div>
  </template>
  
  <script lang="ts" setup>
  const { currentWeatherInfo } = useCurrentWeather();
  
  // var
  const visionThresholds = [
    { max: 5, status: 'Poor Visibility' },
    { max: 8, status: 'Moderate Visibility' },
    { max: 10, status: 'Good Visibility' },
  ];
  
  // computed
  const vision = computed(() => currentWeatherInfo.value?.visibility || 0)
  const visionStatus = computed(() => {
    const percent = vision.value/1000;
    if (!percent || percent > 100) return 'Clear';
    const threshold = visionThresholds.find(t => percent <= t.max);
    return threshold ? threshold.status : 'Clear';
  });
  </script>