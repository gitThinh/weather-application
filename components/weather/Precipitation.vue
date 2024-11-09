<template>
  <div class="text-center space-y-2">
    <p class="font-semibold text-xl">
      {{ `${precipitation} m/s ` }}{{ `${precipitationStatus}` }}
    </p>
    <ShareMultiProgressBar
      :total="precipitation"
      :ranges="precipitationRainThresholds"
    />
  </div>
</template>

<script lang="ts" setup>
const {t} = useI18n();
const weatherStore = useWeatherStore();

// var
const precipitationRainThresholds = [
  { max: 0.3, status: t("precipitation.lightRain") },
  { max: 0.7, status: t("precipitation.rain") },
  { max: 2, status: t("precipitation.moderateRain") },
  { max: 4.2, status: t("precipitation.heavyRain") },
  { max: 7, status: t("precipitation.veryHeavyRain") },
];

const precipitationSnowThresholds = [
  { max: 0.3, status: t("precipitation.lightSnow") },
  { max: 0.7, status: t("precipitation.snow") },
  { max: 2, status: t("precipitation.moderateSnow") },
  { max: 4.2, status: t("precipitation.heavySnow") },
  { max: 7, status: t("precipitation.veryHeavySnow") },
];

// computed
const precipitationRain = computed(
  () =>
  weatherStore.currentWeatherInfo?.rain?.["1h"] ??
  0
);

const precipitationSnow = computed(
  () =>
  weatherStore.currentWeatherInfo?.snow?.["1h"] ??
  0
);

const precipitation = computed(
  () =>
  precipitationRain.value ?? precipitationSnow.value
);

const precipitationStatus = computed(() => {
  const percent = precipitation.value;
  if (!percent || percent > 100) return t("precipitation.clear");
  const precipitationThresholds = precipitationSnow ? precipitationSnowThresholds : precipitationRainThresholds
  const threshold = precipitationThresholds.find((t) => percent <= t.max);
  return threshold ? threshold.status : t("precipitation.clear");
});
</script>
