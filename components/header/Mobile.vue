<template>
    <div class="flex flex-col p-4 space-y-5 min-h-screen" :class="props.class">
      <!-- control unit and choose location -->
      <div class="flex justify-between items-center">
        <HeaderSwitch />
        <!-- time -->
        <h2 class="text-lg font-medium">
            {{ timer.getDayMonth() }}
        </h2>
        <div>
          <button
            aria-label="open-location-input"
            v-if="isShowInputLocation"
            class="flex rounded-lg bg-neutral-50 cursor-pointer"
            @click="handleOpenInputLocation"
          >
            <NuxtIcon
              name="healthicons:magnifying-glass"
              class="w-7 h-7 text-info-dark"
            />
          </button>
          <button
            aria-label="close-location-input"
            v-else
            class="flex rounded-lg bg-neutral-50 cursor-pointer"
            @click="handleCloseInputLocation"
          >
            <NuxtIcon name="ic:outline-close" class="w-7 h-7 text-info-dark" />
          </button>
        </div>
      </div>
  
      <!-- input and show location selected -->
      <div class="w-full flex flex-col items-center justify-center space-x-5 space-y-3">
        <div v-if="isShowInputLocation" class="space-y-5">
          <h1 class="cursor-default text-2xl font-medium">
            <NuxtIcon name="bxs:map" class="w-5 h-5 bg-info-dark" />
            {{ weatherStore.selectedLocation ? convertLocation(weatherStore.selectedLocation) : "" }}
          </h1>
        </div>
        <InputSearch v-show="!isShowInputLocation" :select-location="handleCloseInputLocation" />
      </div>
  
      <!-- sunset and sunrise -->
      <div class="flex justify-evenly">
        <div class="flex gap-1 items-center">
          <NuxtIcon name="hugeicons:sunrise" class="w-7 h-7 text-info-dark" />
          <p class="text-lg">{{ currentWeatherSunrise.formattedTime }}</p>
        </div>
        <div class="flex gap-1 items-center">
          <NuxtIcon name="hugeicons:sunset" class="w-7 h-7 text-info-dark" />
          <p class="text-lg">{{ currentWeatherSunset.formattedTime }}</p>
        </div>
      </div>
  
      <!-- State current weather -->
      <div class="flex flex-1 flex-col justify-center items-center gap-2">
        <div class="mainTemp flex items-center">
          <h1
            v-if="currentWeatherTemp"
            class="text-8xl font-semibold text-info-dark"
          >
            {{ currentWeatherTemp }}
          </h1>
          <NuxtImg :src="getIconUnit()" class="w-14" />
        </div>
        <NuxtImg
          :src="currentWeatherIcon"
          class="w-2/3 object-contain"
        />
        <ShareFlexibleTextWidth
          class="font-medium"
          :text="t(`state.${stringToCamelCase(currentWeatherState?.[0]?.description)}`) || ''"
          :min-size="1.3"
        />
      </div>

      <div class="w-full flex justify-between">
        <MobileShowTabMobile :title="t('moreDetail')" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps({
    class: {
      type: String,
      default: "",
    },
  });
  import convertLocation from "~/composables/convert/convertLocation";

  const {t} = useI18n();
  
  const weatherStore = useWeatherStore();
  
  const { getIconUnit } = useUnitsTemp();
  const isShowInputLocation = ref(!!weatherStore.selectedLocation);
  
  const getCurrentWeatherIcon = () => {
    const descWeather = weatherStore.currentWeatherInfo?.weather?.[0]?.description;
    const iconWeather = weatherStore.currentWeatherInfo?.weather?.[0]?.icon;
  
    return convertWeathericon(descWeather, iconWeather);
  };
  
  // computed base
  const timer = convertSecondToDate();
  const currentWeatherState = computed(() => weatherStore.currentWeatherInfo?.weather);
  const currentWeatherMain = computed(() => weatherStore.currentWeatherInfo?.main);
  
  // computed variable
  const currentWeatherIcon = computed(getCurrentWeatherIcon);
  const currentWeatherTemp = computed(() =>
    Math.round(currentWeatherMain?.value?.temp || 0)
  );
  const currentWeatherSunrise = computed(() =>
    convertSecondToDate(weatherStore.currentWeatherInfo?.sys?.sunrise || 0)
  );
  const currentWeatherSunset = computed(() =>
    convertSecondToDate(weatherStore.currentWeatherInfo?.sys?.sunset || 0)
  );
  
  // methods
  const handleOpenInputLocation = () => {
    isShowInputLocation.value = false;
  };
  
  const handleCloseInputLocation = () => {
    isShowInputLocation.value = true;
  };
  </script>
  