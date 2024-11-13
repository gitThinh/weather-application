<template>
  <div
    class="flex flex-col justify-between p-4 space-y-12 h-full"
    :class="props.class"
  >
    <!-- control unit and choose location -->
    <div class="flex justify-between items-center min-h-10">
      <HeaderSwitch />
      <!-- input and show location selected -->
      <div class="flex flex-1 justify-end items-center space-x-5">
        <div
          class="w-2/3 flex flex-col items-center justify-center space-x-5 space-y-3"
        >
          <div v-if="isShowInputLocation" class="space-y-5">
            <h1 class="cursor-default text-2xl font-medium">
              <NuxtIcon name="bxs:map" class="w-5 h-5 bg-info-dark" />
              {{
                weatherStore.selectedLocation
                  ? convertLocation(weatherStore.selectedLocation)
                  : ""
              }}
            </h1>
          </div>
          <InputSearch
            v-show="!isShowInputLocation"
            :select-location="handleCloseInputLocation"
          />
        </div>
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
    </div>

    <!-- main weather info -->
    <div class="flex items-center w-full">
      <div class="w-1/2 flex flex-col text-center items-center space-y-6">
        <!-- time -->
        <h2 class="text-2xl mx-auto font-medium">
          {{ dayMonth }}
        </h2>

        <!-- main temp -->
        <div class="mainTemp flex items-center">
          <h1 class="text-9xl font-semibold text-info-dark">
            {{ currentWeatherTemp ? currentWeatherTemp : randomNumber }}
          </h1>
          <NuxtImg :src="getIconUnit()" alt="temp-icon" class="w-14" />
        </div>

        <!-- sunset and sunrise -->
        <div class="flex w-full justify-evenly">
          <div class="flex gap-1 items-center">
            <NuxtIcon name="hugeicons:sunrise" class="w-9 h-9 text-info-dark" />
            <p class="text-xl">{{ currentWeatherSunrise.formattedTime }}</p>
          </div>
          <div class="flex gap-1 items-center">
            <NuxtIcon name="hugeicons:sunset" class="w-9 h-9 text-info-dark" />
            <p class="text-xl">{{ currentWeatherSunset.formattedTime }}</p>
          </div>
        </div>
      </div>

      <!-- State current weather -->
      <div class="flex flex-1 flex-col justify-center items-center gap-2">
        <NuxtImg
          :src="currentWeatherIcon"
          :alt="currentWeatherIcon"
          class="w-2/3 max-w-xs object-contain"
        />
        <ShareFlexibleTextWidth
          class="font-medium"
          :text="
            currentWeatherState?.[0]?.description
              ? t(
                  `state.${stringToCamelCase(
                    currentWeatherState?.[0]?.description
                  )}`
                )
              : t('state.clearSky')
          "
          :min-size="1.3"
        />
      </div>
    </div>

    <div class="space-y-6">
      <!-- slider daily weather -->
      <ShareHeaderAndIcon
        class="h-max bg-white p-4 rounded-3xl gap-3"
        title-style="font-medium text-xl"
        :title="`${t('dailyWeather')} (3 ${t('days')})`"
        icon-name="solar:list-broken"
      >
        <ShareSliderDailyWeather :number-items="sliderNumber" />
      </ShareHeaderAndIcon>

      <!-- more detail weather -->
      <div
        class="grid xl:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-x-8 md:gap-4 gap-y-4"
      >
        <ShareHeaderAndIcon
          :title="t('humidity')"
          icon-name="hugeicons:humidity"
        >
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
        <ShareHeaderAndIcon
          :title="t('cloud.root')"
          icon-name="hugeicons:cloud"
        >
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
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
import convertLocation from "~/composables/convert/convertLocation";

const weatherStore = useWeatherStore();

const { getIconUnit } = useUnitsTemp();
const isShowInputLocation = ref(!!weatherStore.selectedLocation);

const windowWidth = ref(window?.innerWidth);

// Function to update windowWidth on resize
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Add event listener on mounted and remove on unmounted
onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const getCurrentWeatherIcon = () => {
  const descWeather =
    weatherStore.currentWeatherInfo?.weather?.[0]?.description;
  const iconWeather = weatherStore.currentWeatherInfo?.weather?.[0]?.icon;

  return convertWeathericon(descWeather, iconWeather);
};

// computed base
const randomNumber = randomNumberPerTime(0, 100, 100);
const timer = convertSecondToDate();
const currentWeatherState = computed(
  () => weatherStore.currentWeatherInfo?.weather
);
const currentWeatherMain = computed(
  () => weatherStore.currentWeatherInfo?.main
);

// computed variable
const dayMonth = computed(
  () =>
    `${t(`day.${timer.dayOfWeek}`)}, ${timer.day} ${t(`month.${timer.month}`)}`
);
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

const sliderNumber = computed(() => (windowWidth.value < 800 ? 8 : 10));

// methods
const handleOpenInputLocation = () => {
  isShowInputLocation.value = false;
};

const handleCloseInputLocation = () => {
  isShowInputLocation.value = true;
};
</script>
