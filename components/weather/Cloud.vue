<template>
  <div class="text-center space-y-2">
    <p class="font-semibold text-xl">
      {{ `${cloudStatus} ${t("cloud.root")}` }}
    </p>
    <ShareMultiProgressBar
      :total="cloud"
      :ranges="cloudThresholds"
      show="status"
    />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const weatherStore = useWeatherStore();

// var
const cloudThresholds = [
  { max: 25, status: t(`cloud.few`) },
  { max: 50, status: t(`cloud.scattered`) },
  { max: 85, status: t(`cloud.broken`) },
  { max: 100, status: t(`cloud.overcast`) },
];

// computed
const cloud = computed(() => weatherStore.currentWeatherInfo?.clouds.all || 0);
const cloudStatus = computed(() => {
  const percent = cloud.value;
  if (!percent || percent > 100) return t(`cloud.clear`);
  const threshold = cloudThresholds.find((t) => percent <= t.max);
  return threshold ? threshold.status : t(`cloud.clear`);
});
</script>
