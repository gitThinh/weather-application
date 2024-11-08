<template>
  <div class="text-center space-y-2">
    <p class="font-semibold text-xl">
      {{ `${precipitation} m/s ` }}{{ `${precipitationStatus} ${precipitationRain ? "Rain" : ""}${precipitationSnow ? "Snow" : ""}` }}
    </p>
    <ShareMultiProgressBar
      :total="precipitation"
      :ranges="precipitationThresholds"
    />
  </div>
</template>

<script lang="ts" setup>
const weatherStore = useWeatherStore();

// var
const precipitationThresholds = [
  { max: 0.3, status: "Light " },
  { max: 0.7, status: "" },
  { max: 2, status: "Moderate " },
  { max: 4.2, status: "Heavy " },
  { max: 7, status: "Very heavy " },
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
  if (!percent || percent > 100) return "clear";
  const threshold = precipitationThresholds.find((t) => percent <= t.max);
  return threshold ? threshold.status : "clear";
});
</script>
