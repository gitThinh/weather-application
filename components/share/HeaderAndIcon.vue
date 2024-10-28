<template>
  <div class="w-full h-full flex flex-col justify-between" :class="class">
    <!-- header component -->
    <div class="flex justify-between items-center">
      <p>{{ title }}</p>
      <div class="bg-info-dark rounded-lg p-1 flex">
        <NuxtIcon :name="iconName" class="text-neutral-50 w-5 h-5" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  class: {
    type: String,
    default: "bg-neutral-50 rounded-3xl p-6",
  },
  title: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
});
</script>
