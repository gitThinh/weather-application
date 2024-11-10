<template>
  <div class="text-center space-y-2">
    <p class="font-semibold text-xl">{{ visionStatus }}</p>
    <ShareMultiProgressBar :total="vision / 1000" :ranges="visionThresholds" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const weatherStore = useWeatherStore();

// var
const visionThresholds = [
  { max: 5, status: t("visibility.poorVisibility") },
  { max: 8, status: t("visibility.moderateVisibility") },
  { max: 10, status: t("visibility.goodVisibility") },
];

// computed
const vision = computed(() => weatherStore.currentWeatherInfo?.visibility || 0);
const visionStatus = computed(() => {
  const percent = vision.value / 1000;
  if (!percent || percent > 100) return t("visibility.goodVisibility");
  const threshold = visionThresholds.find((t) => percent <= t.max);
  return threshold ? threshold.status : t("visibility.goodVisibility");
});
</script>
