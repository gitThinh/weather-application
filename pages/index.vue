<template>
  <NuxtLayout name="default-layout">
    <div class="w-full h-screen grid grid-cols-12 container overflow-hidden mx-auto">
      <!-- sidebar -->
      <Header class="col-span-3 bg-info-light rounded-2xl mr-1"></Header>
      <!-- dashboard -->
      <div class="col-span-9 bg-info-light rounded-2xl p-12 h-full flex flex-col justify-between">
        <WeatherState :data="testData" />
        <div class="grid grid-cols-3 grid-rows-2 gap-8">
          <ShareHeaderAndIcon title="Humidity" icon-name="hugeicons:humidity">
            <WeatherHumidity />
          </ShareHeaderAndIcon>
          <ShareHeaderAndIcon title="Wind" icon-name="hugeicons:fast-wind">
            <WeatherHumidity />
          </ShareHeaderAndIcon>
          <ShareHeaderAndIcon title="Precipitation" icon-name="hugeicons:cloud-little-rain">
            <WeatherHumidity />
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
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { weatherHourData } from "~/components/weather/state.vue";

useSeoMeta({
  title: "Home",
});

const testData: weatherHourData = {
  hour: "08PM",
  desc: "broken clouds",
  icon: "04n",
  temp: 24.99,
};
</script>

<style></style>
