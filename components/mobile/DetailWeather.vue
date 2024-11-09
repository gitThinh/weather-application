<template>
  <div class="space-y-3 overflow-y-auto h-full">
    <ShareHeaderAndIcon :title="t('humidity')" icon-name="hugeicons:humidity">
      <WeatherHumidity />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon
      :title="`${t('wind.root')} (m/s)`"
      icon-name="hugeicons:fast-wind"
    >
      <WeatherWind />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon
      :title="`${t('precipitation.root')} (mm/h)`"
      icon-name="hugeicons:cloud-little-rain"
    >
      <WeatherPrecipitation />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon :title="t('cloud.root')" icon-name="hugeicons:cloud">
      <WeatherCloud />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon
      :title="t('feelsLike')"
      icon-name="hugeicons:temperature"
    >
      <WeatherFeelLike />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon
      :title="t('visibility.root')"
      icon-name="hugeicons:vision"
    >
      <WeatherVisibility />
    </ShareHeaderAndIcon>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>
