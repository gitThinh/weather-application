<template>
  <div class="space-y-3 overflow-y-auto h-full">
    <ShareHeaderAndIcon title="Humidity" icon-name="hugeicons:humidity">
      <WeatherHumidity />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon title="Wind (m/s)" icon-name="hugeicons:fast-wind">
      <WeatherWind />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon
      title="Precipitation (mm/h)"
      icon-name="hugeicons:cloud-little-rain"
    >
      <WeatherPrecipitation />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon title="Cloud" icon-name="hugeicons:cloud">
      <WeatherCloud />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon title="Feels like" icon-name="hugeicons:temperature">
      <WeatherFeelLike />
    </ShareHeaderAndIcon>
    <ShareHeaderAndIcon title="Visibility" icon-name="hugeicons:vision">
      <WeatherVisibility />
    </ShareHeaderAndIcon>
  </div>
</template>

<script lang="ts" setup></script>
