<template>
  <div class="overflow-hidden bg-neutral-50 rounded-3xl relative w-full">
    <div
      class="flex transition-transform duration-500"
      :style="{ transform: `translateX(-${currentIndex * (100 / numberItems)}%)` }"
    >
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        :style="{ flex: `0 0 calc(100% / ${numberItems})` }"
        class="lg:p-2 xl:p-3"
      >
        <WeatherState :data="item" class="bg-info-light border-info-normal h-full"/>
      </div>
    </div>
    <button
      aria-label="prev-time"
      @click="prevSlide"
      class="absolute top-1/2 transform -translate-y-1/2 bg-info-normal bg-opacity-60 rounded-full left-0 p-2 cursor-pointer"
      :class="currentIndex === 0 && 'hidden'"
    >
      <NuxtIcon name="grommet-icons:previous" class="h-6 w-6 block" />
    </button>
    <button
      aria-label="next-time"
      @click="nextSlide"
      class="absolute top-1/2 transform -translate-y-1/2 right-0 bg-info-normal bg-opacity-60 p-2 rounded-full cursor-pointer"
      :class="isMaxSlider && 'hidden'"
    >
      <NuxtIcon name="grommet-icons:next" class="h-6 w-6 block" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  numberItems: number;
}>();

const dailyWeather = useDailyWeather();

// state
const currentIndex = ref(0);
const items = computed(() => dailyWeather.dailyWeatherInfo.value?.list ?? [])

const isMaxSlider = computed(() => currentIndex.value + 1 === items.value.length - props.numberItems);

// methods
function nextSlide() {
  if (currentIndex.value + 1 === items.value.length - props.numberItems) return;
  currentIndex.value = (currentIndex.value + 1) % (items.value.length - props.numberItems);
}

function prevSlide() {
  if (currentIndex.value === 0) return;
  currentIndex.value =
    (currentIndex.value - 1 + (items.value.length - props.numberItems)) % (items.value.length - props.numberItems);
}

watch(items, () => {
  currentIndex.value = 0;
});
</script>