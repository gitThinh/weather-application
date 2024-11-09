<template>
  <NuxtLayout name="default-layout">
    <div
      class="hidden lg:grid w-full min-h-screen grid-cols-12 container overflow-hidden mx-auto"
    >
      <!-- sidebar -->
      <Header class="col-span-3 bg-info-light rounded-2xl mr-1"></Header>
      <!-- dashboard -->
      <div
        class="col-span-9 bg-info-light rounded-2xl px-12 py-8 h-full flex flex-col justify-around 2xl:justify-start space-y-6 overflow-y-auto"
      >
        <!-- <ShareHeaderAndIcon title-style="font-medium text-xl" title="Daily Weather">
        </ShareHeaderAndIcon> -->
        <div class="hidden md:block">
          <ShareHeaderAndIcon
            class="bg-white p-4 rounded-3xl gap-3"
            title-style="font-medium text-xl"
            :title="`${t('dailyWeather')} (3 ${t('days')})`"
            icon-name="solar:list-broken"
          >
            <ShareSliderDailyWeather :number-items="8" />
          </ShareHeaderAndIcon>
        </div>
        <div class="grid  xl:grid-cols-3 sm:grid-cols-2 gap-x-8 gap-y-4">
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
          <ShareHeaderAndIcon :title="t('visibility.root')" icon-name="hugeicons:vision">
            <WeatherVisibility />
          </ShareHeaderAndIcon>
        </div>
      </div>
    </div>
    <MobileMainMobile />
    <TabletMainTablet />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const {t} = useI18n()


//seo
useSeoMeta({
  title: "Home",
});

useCurrentWeather();
</script>

<style></style>
