<template>
    <div class="grid grid-cols-10 h-full gap-x-3 gap-y-2">
        <div v-for="item in listItems" :key="item.id" class="col-span-1 w-full">
          <WeatherState :data="item" class=" h-full"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
// state
const {dailyWeatherInfo} = useDailyWeather();

const listItems = computed(() => dailyWeatherInfo?.value?.list ?? [])
</script>