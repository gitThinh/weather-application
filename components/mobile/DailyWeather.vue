<template>
  <div class="space-y-4">
    <div v-for="(item, index) in items" :key="index" class="lg:p-2 xl:p-3">
      <BigerState
        :data="item"
        class="bg-info-light border-info-normal h-full"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BigerState from '../weather/BigerState.vue';

const dailyWeather = useDailyWeather();

// state
const items = computed(() => dailyWeather.dailyWeatherInfo.value?.list ?? []);
</script>
